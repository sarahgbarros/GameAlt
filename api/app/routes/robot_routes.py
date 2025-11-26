from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from typing import List
from pydantic import BaseModel
from ..services.robot_service import robot_service
from ..utils.spike_commands import COMMAND_MAP

router = APIRouter(prefix="")

VALID_COMMANDS = set(COMMAND_MAP.keys())


class CommandRequest(BaseModel):
    commands: List[str]


class ConnectRequest(BaseModel):
    mac: str


class PythonCodeRequest(BaseModel):
    code: str


@router.get("/discover")
async def discover():
    """Descobre dispositivos Spike Prime próximos"""
    return await robot_service.discover()


@router.post("/connect")
async def connect_robot(req: ConnectRequest):
    """Conecta ao Spike Prime via BLE"""
    if not req.mac:
        raise HTTPException(400, "MAC address obrigatório")

    ok = await robot_service.connect(req.mac)
    if not ok:
        raise HTTPException(500, "Falha ao conectar")

    return {"status": "connected", "mac": req.mac}


@router.post("/disconnect")
async def disconnect_robot():
    """Desconecta do Spike Prime"""
    await robot_service.disconnect()
    return {"status": "disconnected"}


@router.post("/execute")
async def execute(request: CommandRequest):
    """
    Executa uma lista de comandos no robô.
    
    Exemplo:
    {
        "commands": ["forward", "beep", "left", "stop"]
    }
    """
    if not robot_service.connected:
        raise HTTPException(400, "Robot not connected")

    responses = await robot_service.execute_commands(request.commands)
    
    return {
        "status": "success",
        "commands_executed": request.commands,
        "responses": responses
    }


@router.post("/execute/python")
async def execute_python(request: PythonCodeRequest):
    """
    Executa código Python customizado no Spike Prime.
    
    Exemplo:
    {
        "code": "from hub import sound\\nsound.beep(440, 500)"
    }
    """
    if not robot_service.connected:
        raise HTTPException(400, "Robot not connected")

    responses = await robot_service.send_raw_python(request.code)
    
    return {
        "status": "success",
        "responses": responses
    }


@router.get("/status")
async def status():
    """Retorna o status da conexão e comandos disponíveis"""
    return robot_service.get_status()


@router.get("/commands")
async def list_commands():
    """Lista todos os comandos disponíveis"""
    return {
        "commands": sorted(list(VALID_COMMANDS)),
        "total": len(VALID_COMMANDS)
    }


@router.post("/test")
async def test_connection():
    """
    Testa a conexão enviando um beep simples.
    Use este endpoint após conectar para verificar se está funcionando.
    """
    if not robot_service.connected:
        raise HTTPException(400, "Robot not connected")

    responses = await robot_service.execute_commands(["test"])
    
    return {
        "status": "test_sent",
        "message": "Se você ouviu um beep e viu um smile no display, está funcionando!",
        "responses": responses
    }


# ===== WEBSOCKET =====

connected_clients = []


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    WebSocket para controle em tempo real do robô.
    
    Envie comandos como texto simples: "forward", "left", "stop", etc.
    """
    await websocket.accept()
    connected_clients.append(websocket)

    await websocket.send_json({
        "type": "connection",
        "status": "connected",
        "message": "WebSocket connected successfully"
    })

    try:
        while True:
            data = await websocket.receive_text()
            cmd = data.strip().lower()

            # Verifica se está conectado ao robô
            if not robot_service.connected:
                await websocket.send_json({
                    "type": "error",
                    "message": "Robot not connected. Use /connect endpoint first."
                })
                continue

            # Verifica se o comando é válido
            if cmd not in VALID_COMMANDS:
                await websocket.send_json({
                    "type": "error",
                    "message": f"Invalid command: '{cmd}'",
                    "available_commands": sorted(list(VALID_COMMANDS))[:10]  # Primeiros 10
                })
                continue

            # Executa o comando
            try:
                responses = await robot_service.execute_commands([cmd])

                await websocket.send_json({
                    "type": "success",
                    "command": cmd,
                    "responses": responses,
                    "timestamp": __import__("datetime").datetime.now().isoformat()
                })
            
            except Exception as e:
                await websocket.send_json({
                    "type": "error",
                    "message": f"Error executing command: {str(e)}",
                    "command": cmd
                })

    except WebSocketDisconnect:
        pass

    finally:
        if websocket in connected_clients:
            connected_clients.remove(websocket)