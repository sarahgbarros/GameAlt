import serial
import time
import os
from app.utils.command_parser import parse_command_list

class RobotService:
    def __init__(self, port=None, baudrate=None):
        self.port = port or os.getenv("SERIAL_PORT")
        self.baudrate = baudrate or int(os.getenv("SERIAL_BAUDRATE", 9600))
        self.connection = None

    def connect(self):
        """Abre conexão Serial com o robô"""
        try:
            self.connection = serial.Serial(self.port, self.baudrate, timeout=1)
            time.sleep(2)  
            print(f"🔌 Robô conectado na porta {self.port} a {self.baudrate} baud")
            return True
        except Exception as e:
            raise("Erro ao conectar:", e)
            

    def send_command(self, command: str):
        """Envia comando único para o robô"""
        if self.connection and self.connection.is_open:
            self.connection.write(command.encode())
            return True
        return False

    def execute_commands(self, commands: list[str]):
        """Executa lista de comandos sequencialmente"""
        parsed = parse_command_list(commands)
        for cmd in parsed:
            self.send_command(cmd)
            time.sleep(0.5) 
        return True

robot_service = RobotService()
