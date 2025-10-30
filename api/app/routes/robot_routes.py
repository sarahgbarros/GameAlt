from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from typing import List
from pydantic import BaseModel
from ..services.robot_service import robot_service

router = APIRouter()

VALID_COMMANDS = {"forward", "backward", "left", "right"}

class CommandRequest(BaseModel):
    commands: List[str]

@router.post("/connect")
async def connect_robot():
    """Conecta ao robô via Bluetooth"""
    try:
        success = robot_service.connect()
        if success:
            return {"status": "connected", "message": "Robot connected successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to connect to robot")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Connection error: {str(e)}")

@router.post("/execute")
async def execute_commands(request: CommandRequest):
    """Executa uma lista de comandos no robô"""
    commands = request.commands
    
    if not commands:
        raise HTTPException(status_code=400, detail="Commands list cannot be empty")
    
    if not robot_service.connected:
        raise HTTPException(status_code=400, detail="Robot not connected")
    
    invalid_commands = [cmd for cmd in commands if cmd.lower() not in VALID_COMMANDS]
    if invalid_commands:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid commands: {invalid_commands}. Valid commands are: {list(VALID_COMMANDS)}"
        )
    
    try:
        success = await robot_service.execute_commands(commands)
        if success:
            return {"status": "success", "executed": commands}
        else:
            raise HTTPException(status_code=500, detail="Failed to execute commands")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Execution error: {str(e)}")

@router.post("/disconnect")
async def disconnect_robot():
    """Desconecta do robô"""
    try:
        success = robot_service.disconnect()
        if success:
            return {"status": "disconnected", "message": "Robot disconnected successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to disconnect from robot")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Disconnection error: {str(e)}")

@router.get("/status")
async def get_status():
    """Retorna o status da conexão do robô"""
    return robot_service.get_status()

connected_clients = []

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket para enviar comandos em tempo real e receber feedback"""
    await websocket.accept()
    connected_clients.append(websocket)
    
    try:
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "robot_connected": robot_service.connected
        })
        
        while True:
            data = await websocket.receive_text()
            
            if data.lower() not in VALID_COMMANDS:
                await websocket.send_json({
                    "type": "error",
                    "message": f"Invalid command: {data}"
                })
                continue
            
            if not robot_service.connected:
                await websocket.send_json({
                    "type": "error",
                    "message": "Robot not connected"
                })
                continue
            
            try:
                success = await robot_service.execute_commands([data])
                
                if success:
                    await websocket.send_json({
                        "type": "success",
                        "command": data,
                        "message": f"Executed: {data}"
                    })
                else:
                    await websocket.send_json({
                        "type": "error",
                        "command": data,
                        "message": f"Failed to execute: {data}"
                    })
            except Exception as e:
                await websocket.send_json({
                    "type": "error",
                    "message": str(e)
                })
                
    except WebSocketDisconnect:
        print("Client disconnected from WebSocket")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        if websocket in connected_clients:
            connected_clients.remove(websocket)