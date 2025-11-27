import asyncio
import logging
from typing import List, Optional, Set
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Suas importações
from .spike_driver import SpikeBLEConnection

logging.basicConfig(level=logging.INFO)
log = logging.getLogger("robot-service")

class ConnectRequest(BaseModel):
    mac: Optional[str] = None

class ExecuteRequest(BaseModel):
    commands: List[str]

class CodeRequest(BaseModel):
    code: str


class RobotService:
    def __init__(self):
        self.spike = SpikeBLEConnection()
        self.connected = False
        self._response_buffer = ""
        self.websocket_manager = None

    def set_websocket_manager(self, manager):
        """Vincula o WebSocket manager para broadcasts"""
        self.websocket_manager = manager

    def _on_ble_notification(self, data: bytes):
        """Callback para notificações BLE do Spike"""
        try:
            decoded = data.decode("utf-8", errors="ignore")
            self._response_buffer += decoded
            log.debug(f"🤖 Spike: {decoded.strip()}")
            
            # Broadcast via WebSocket se disponível
            if self.websocket_manager and decoded.strip():
                asyncio.create_task(self.websocket_manager.broadcast({
                    "type": "spike_output",
                    "data": decoded.strip()
                }))
        except Exception as e:
            log.error(f"Erro no callback BLE: {e}")

    async def discover(self):
        """Descobre dispositivos Spike Prime próximos"""
        try:
            log.info("🔍 Escaneando por Spike Prime...")
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "status",
                    "message": "🔍 Procurando Spike Prime..."
                })
            
            mac = await self.spike.discover_prime(timeout=10)
            
            if not mac:
                msg = "❌ Nenhum Spike Prime encontrado"
                log.warning(msg)
                if self.websocket_manager:
                    await self.websocket_manager.broadcast({
                        "type": "error",
                        "message": msg
                    })
                return {"found": False, "mac": None, "message": msg}
            
            log.info(f"✅ Spike encontrado: {mac}")
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "discovered",
                    "mac": mac,
                    "message": f"✅ Spike encontrado: {mac}"
                })
            
            return {"found": True, "mac": mac, "message": "Spike Prime encontrado"}
            
        except Exception as e:
            log.error(f"Erro ao descobrir: {e}")
            return {"found": False, "mac": None, "error": str(e)}

    async def connect(self, mac: Optional[str] = None) -> bool:
        """Conecta ao Spike Prime via BLE"""
        try:
            log.info("🔗 Iniciando conexão...")
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "status",
                    "message": "🔗 Conectando ao Spike..."
                })
            
            # Se não passou MAC, descobre automaticamente
            if not mac:
                log.info("MAC não fornecido, descobrindo automaticamente...")
                mac = await self.spike.discover_prime(timeout=10)
                if not mac:
                    log.error("Spike não encontrado")
                    if self.websocket_manager:
                        await self.websocket_manager.broadcast({
                            "type": "error",
                            "message": "❌ Spike não encontrado"
                        })
                    return False
            
            # Conecta via BLE com callback
            await self.spike.connect(mac, notify_callback=self._on_ble_notification)
            
            self.connected = True
            log.info("✅ Conectado ao Spike Prime!")
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "connected",
                    "mac": mac,
                    "message": "🎉 Spike Prime conectado e pronto!"
                })
            
            return True
            
        except Exception as e:
            log.error(f"❌ Erro ao conectar: {e}")
            self.connected = False
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "error",
                    "message": f"❌ Erro: {str(e)}"
                })
            
            return False

    async def disconnect(self):
        """Desconecta do Spike Prime"""
        try:
            await self.spike.disconnect()
            self.connected = False
            log.info("💤 Desconectado")
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "disconnected",
                    "message": "🔴 Spike desconectado"
                })
                
        except Exception as e:
            log.error(f"Erro ao desconectar: {e}")

    async def execute_commands(self, commands: List[str]) -> List[str]:
        """Executa lista de comandos Python no Spike"""
        if not self.connected:
            log.error("Robô não conectado")
            return ["ERROR: Robot not connected"]

        results = []
        
        for cmd in commands:
            try:
                log.info(f"📤 Executando: {cmd[:50]}...")
                
                if self.websocket_manager:
                    await self.websocket_manager.broadcast({
                        "type": "executing",
                        "command": cmd
                    })
                
                self._response_buffer = ""
                
                # Envia comando via BLE
                await self.spike.send(cmd.encode("utf-8"))
                await asyncio.sleep(0.05)
                await self.spike.send(b'\x04')  # Ctrl-D para executar
                
                # Aguarda execução
                await asyncio.sleep(1.0)
                
                response = self._response_buffer.strip()
                result = response if response else "✓ Executado"
                results.append(result)
                
                log.info(f"✅ Resultado: {result}")
                
            except Exception as e:
                log.error(f"Erro ao executar {cmd}: {e}")
                results.append(f"ERROR: {str(e)}")
                
                if self.websocket_manager:
                    await self.websocket_manager.broadcast({
                        "type": "error",
                        "message": f"❌ Erro: {str(e)}"
                    })
        
        return results

    async def send_raw_python(self, code: str) -> List[str]:
        """Envia código Python bruto para o Spike"""
        if not self.connected:
            return ["ERROR: Robot not connected"]

        try:
            log.info(f"📤 Enviando código ({len(code)} chars)...")
            
            if self.websocket_manager:
                await self.websocket_manager.broadcast({
                    "type": "executing",
                    "message": "⚙️ Executando código..."
                })
            
            self._response_buffer = ""
            
            # Envia código
            await self.spike.send(code.encode("utf-8"))
            await asyncio.sleep(0.1)
            await self.spike.send(b'\x04')
            
            # Aguarda execução
            await asyncio.sleep(1.5)
            
            response = self._response_buffer.strip()
            result = [response if response else "✓ Código executado"]
            
            log.info(f"✅ Resultado: {result[0]}")
            return result
            
        except Exception as e:
            log.error(f"Erro ao enviar código: {e}")
            return [f"ERROR: {str(e)}"]

    def get_status(self):
        """Retorna status da conexão"""
        return {
            "connected": self.connected,
            "connection_type": "Direct BLE",
            "mac": self.spike.mac if self.spike else None,
            "tx_uuid": self.spike.tx_uuid if self.spike else None,
            "rx_uuid": self.spike.rx_uuid if self.spike else None
        }


robot_service = RobotService()


__all__ = ['app', 'robot_service', 'manager', 'RobotService', 'ConnectionManager']