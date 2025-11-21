import serial
import asyncio 

MOCK_MODE = True

class BluetoothConnection:
    def __init__(self, port="/dev/rfcomm0", baudrate=9600, timeout=1):
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout
        self.connection = None

    async def connect(self):
        if MOCK_MODE:
            print(f"🔒 [MOCK] Conectado simulado na porta {self.port}")
            await asyncio.sleep(0.5) 
            return True 

        try:
            self.connection = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
            await asyncio.sleep(2) 
            return True
        except Exception as e:
            print("Erro ao conectar:", e)
            return False

    async def send(self, command: str):
        if MOCK_MODE:
            print(f"🚀 [MOCK] Enviando comando para o robô: {command}")
            await asyncio.sleep(0.2) 
            return True

        if self.connection and self.connection.is_open:
            self.connection.write(command.encode())
            return True
        return False

    async def disconnect(self):
        if MOCK_MODE:
            print("🔌 [MOCK] Desconectado simulado")
            return

        if self.connection:
            self.connection.close()