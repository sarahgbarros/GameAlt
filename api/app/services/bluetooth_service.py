import serial
import time

class BluetoothConnection:
    def __init__(self, port="/dev/rfcomm0", baudrate=9600, timeout=1):
        self.port = port
        self.baudrate = baudrate
        self.timeout = timeout
        self.connection = None

    def connect(self):
        try:
            self.connection = serial.Serial(self.port, self.baudrate, timeout=self.timeout)
            time.sleep(2)
            return True
        except Exception as e:
            print("Erro ao conectar:", e)
            return False

    def send(self, command: str):
        if self.connection and self.connection.is_open:
            self.connection.write(command.encode())
            return True
        return False

    def disconnect(self):
        if self.connection:
            self.connection.close()
