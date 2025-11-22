import os
from .bluetooth_service import BluetoothConnection
from .websocket_manager import websocket_manager
from ..utils.command_parser import parse_command
import asyncio

SETUP_SCRIPT = """
import hub
from spike import MotorPair
# Configura motores nas portas A e B
motor_pair = MotorPair('A', 'B') 
motor_pair.set_default_speed(50)
print("Robo Pronto")
"""

class RobotService:
    def __init__(self, bluetooth=None, websocket_manager_instance=None):
        self.port = os.getenv("SERIAL_PORT", "/dev/rfcomm0")
        self.baudrate = int(os.getenv("SERIAL_BAUDRATE", "9600"))
        self.bluetooth = bluetooth if bluetooth is not None else BluetoothConnection(self.port, self.baudrate)
        self.websocket_manager = websocket_manager_instance if websocket_manager_instance is not None else websocket_manager
        self.connected = False
    
    async def connect(self) -> bool:
        try:
            self.connected = await self.bluetooth.connect()

            if self.connected: 
                for line in SETUP_SCRIPT.split('\n'):
                    if line:
                        await self.bluetooth.send(line + "\r\n")
                        await asyncio.sleep(0.1)
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast(f'{{"type": "status", "connected": {str(self.connected).lower()}}}')
            
            return self.connected
        except Exception as e:
            print(f"Erro no service connect: {e}")
            return False
    
    async def execute_commands(self, commands: list[str]) -> bool:
        if not self.connected or not commands:
            return False
        
        try:
            for cmd in commands:
                hardware_code = parse_command(cmd)
                cmd_to_send = hardware_code if hardware_code else cmd

                if not await self.bluetooth.send(cmd_to_send):
                    return False
                
                if self.websocket_manager:
                    await self.websocket_manager.broadcast(f'{{"type": "executed", "command": "{cmd}"}}')
            return True
        except Exception as e:
            print(f"Error executing commands: {e}")
            return False
        
    async def disconnect(self) -> bool:
        try:
            await self.bluetooth.disconnect()
            self.connected = False
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast('{"type": "status", "connected": false}')
                
            return True
        except Exception:
            return False

    def get_status(self):
        return {
            "connected": self.connected,
            "port": self.port,
            "type": "bluetooth"
        }

robot_service = RobotService()