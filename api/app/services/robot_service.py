import os
from .bluetooth_service import BluetoothConnection
from .websocket_manager import websocket_manager
import re

class RobotService:
    def __init__(self, bluetooth=None, websocket_manager_instance=None):
        self.port = os.getenv("SERIAL_PORT", "/dev/rfcomm0")
        self.baudrate = int(os.getenv("SERIAL_BAUDRATE", "9600"))
        self.bluetooth = bluetooth if bluetooth is not None else BluetoothConnection(self.port, self.baudrate)
        self.websocket_manager = websocket_manager_instance if websocket_manager_instance is not None else websocket_manager
        self.connected = False
    
    def connect(self) -> bool:
        try:
            self.connected = self.bluetooth.connect()
            return self.connected
        except Exception as e:
            raise Exception(f"Connection failed: {e}")
    
    async def execute_commands(self, commands: list[str]) -> bool:
        if not self.connected or not commands:
            return False
        
        try:
            for cmd in commands:
                if not self.bluetooth.send(cmd):
                    return False
                broadcast_result = self.websocket_manager.broadcast(f"Executed: {cmd}")
                if hasattr(broadcast_result, '__await__'):
                    await broadcast_result
            return True
        except Exception as e:
            print(f"Error executing commands: {e}")
            return False

robot_service = RobotService()