from fastapi import FastAPI, HTTPException, WebSocket
from pydantic import BaseModel
from .services.websocket_manager import websocket_manager
from typing import List
from .config import settings

app = FastAPI(title="Robot Control API")

robot_connected = False

class CommandRequest(BaseModel):
    commands: List[str]

@app.post("/api/robot/connect")
async def connect_robot():
    global robot_connected
    try:
        robot_connected = True
        return {"status": "connected", "message": "Robot connected successfully"}
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to connect to robot")

@app.post("/api/robot/execute")
async def execute_commands(command_request: CommandRequest):
    if not robot_connected:
        raise HTTPException(status_code=400, detail="Robot not connected")
    
    valid_commands = ["forward", "backward", "left", "right"]
    invalid = [cmd for cmd in command_request.commands if cmd.lower() not in valid_commands]
    if invalid:
        raise HTTPException(status_code=400, detail="Invalid commands")
    
    return {"status": "success", "executed": command_request.commands}

@app.get("/api/robot/status")
async def get_status():
    # Example port value, replace with actual if available
    return {"connected": robot_connected, "port": "COM3"}

@app.get("/")
def root():
    return {"message": "API do robô online"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        websocket_manager.disconnect(websocket)

# This ensures pytest and other test runners can import the app instance
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

