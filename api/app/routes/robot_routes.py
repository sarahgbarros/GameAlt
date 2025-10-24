from fastapi import APIRouter, WebSocket
from typing import List
from app.services.robot_service import robot_service

router = APIRouter()

@router.post("/connect")
def connect_robot():
    connected = robot_service.connect()
    return {"connected": connected}

@router.post("/execute")
def execute_commands(commands: List[str]):
    """Recebe lista de comandos do Blockly e envia para o robô"""
    success = robot_service.execute_commands(commands)
    return {"success": success, "executed": commands}

connected_clients = []

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket para enviar comandos em tempo real"""
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            robot_service.execute_commands([data])
            await websocket.send_text(f"Executando: {data}")
    except Exception:
        print("Cliente desconectado")
    finally:
        connected_clients.remove(websocket)
