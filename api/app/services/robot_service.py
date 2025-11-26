import asyncio
import logging
from typing import List
from .lego_web_bridge import LegoWebBridge, LEGO_WEB_COMMAND_MAP

log = logging.getLogger("robot-service")


class RobotService:
    def __init__(self):
        self.bridge = LegoWebBridge()
        self.connected = False
        self._responses = []

    def _on_response(self, data):
        """Callback para respostas do app LEGO Web"""
        log.info(f"Resposta do LEGO Web: {data}")
        self._responses.append(str(data))

    async def discover(self):
        """
        Descoberta não necessária com LEGO Web Bridge
        A página já gerencia a conexão com o Spike Prime
        """
        return {
            "found": True,
            "message": "Use o LEGO Education Spike app ou página web para conectar ao Spike Prime",
            "instructions": [
                "1. Abra spike.legoeducation.com",
                "2. Conecte ao Spike Prime",
                "3. Abra o Console (F12) e cole o script do backend",
                "4. Clique em 'Conectar Robô' aqui"
            ]
        }

    async def connect(self, mac: str = None) -> bool:
        """Conecta ao LEGO Web Bridge"""
        try:
            log.info("Conectando ao LEGO Web Bridge...")
            success = await self.bridge.connect(callback=self._on_response)
            if not success:
                log.error("Falha ao conectar ao LEGO Web Bridge")
                log.info("💡 Verifique se a página do Spike Prime está aberta e o script foi colado no Console")
                return False

            self.connected = True
            log.info("✅ Conectado ao LEGO Web Bridge!")
            await asyncio.sleep(0.5)  # pequeno delay
            return True
        except Exception as e:
            log.error(f"Erro na conexão: {e}")
            self.connected = False
            return False

    async def disconnect(self):
        """Desconecta do LEGO Web Bridge"""
        try:
            await self.bridge.disconnect()
            self.connected = False
            log.info("Desconectado do LEGO Web Bridge")
        except Exception as e:
            log.error(f"Erro ao desconectar: {e}")

    async def execute_commands(self, commands: List[str]) -> List[str]:
        """Executa comandos usando LEGO_WEB_COMMAND_MAP"""
        if not self.connected:
            log.error("Não conectado ao LEGO Web Bridge")
            return ["ERROR: Not connected to LEGO Web Bridge"]

        responses = []

        for cmd in commands:
            python_code = LEGO_WEB_COMMAND_MAP.get(cmd)
            if not python_code:
                log.error(f"Comando desconhecido: {cmd}")
                responses.append(f"ERROR: Unknown command '{cmd}'")
                continue

            try:
                log.info(f"Executando comando: {cmd}")
                log.debug(f"Código:\n{python_code}")

                self._responses = []
                success = await self.bridge.send_python_code(python_code)

                if not success:
                    responses.append(f"ERROR: Failed to send '{cmd}'")
                    continue

                await asyncio.sleep(0.5)
                if self._responses:
                    responses.extend(self._responses)
                else:
                    responses.append(f"Command '{cmd}' sent successfully")

                await asyncio.sleep(0.2)
            except Exception as e:
                log.error(f"Erro ao executar {cmd}: {e}")
                responses.append(f"ERROR: {str(e)}")

        return responses

    async def send_raw_python(self, code: str) -> List[str]:
        """Envia código Python/JS customizado"""
        if not self.connected:
            return ["ERROR: Not connected to LEGO Web Bridge"]

        try:
            log.info("Enviando código customizado...")
            log.debug(f"Código:\n{code}")

            self._responses = []
            success = await self.bridge.send_python_code(code)

            if not success:
                return ["ERROR: Failed to send code"]

            await asyncio.sleep(0.5)
            return self._responses if self._responses else ["Code sent successfully"]
        except Exception as e:
            log.error(f"Erro ao enviar código: {e}")
            return [f"ERROR: {str(e)}"]

    def get_status(self):
        """Retorna status da conexão e comandos disponíveis"""
        return {
            "connected": self.connected,
            "connection_type": "LEGO Web Bridge",
            "available_commands": list(LEGO_WEB_COMMAND_MAP.keys()),
            "note": "A página web do LEGO Education Spike deve estar aberta e o script injetado"
        }


# Singleton instance
robot_service = RobotService()
