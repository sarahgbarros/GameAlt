"""
LEGO Spike Prime Bridge - Web Version
Comunica com o LEGO Education Spike via extensão do navegador
"""
import asyncio
import json
import logging
from typing import Optional, Callable
from aiohttp import web
import aiohttp

log = logging.getLogger("lego-bridge")


class LegoWebBridge:
    """
    Bridge para comunicar com LEGO Education Spike Web
    Funciona criando um servidor local que se comunica com a página web
    """
    
    def __init__(self):
        self.app = None
        self.runner = None
        self.connected = False
        self.websocket_client = None
        self._response_callback: Optional[Callable] = None
        self.pending_responses = []
        
    async def start_server(self, port: int = 8765):
        """Inicia servidor WebSocket local para comunicação com a página"""
        
        async def websocket_handler(request):
            """Handler para conexões WebSocket"""
            ws = web.WebSocketResponse()
            await ws.prepare(request)
            
            log.info("✅ Cliente conectado via WebSocket")
            self.websocket_client = ws
            self.connected = True
            
            try:
                async for msg in ws:
                    if msg.type == aiohttp.WSMsgType.TEXT:
                        data = json.loads(msg.data)
                        log.debug(f"Recebido: {data}")
                        
                        # Processa resposta
                        if self._response_callback:
                            self._response_callback(data)
                        else:
                            self.pending_responses.append(data)
                            
                    elif msg.type == aiohttp.WSMsgType.ERROR:
                        log.error(f'Erro WebSocket: {ws.exception()}')
                        
            except Exception as e:
                log.error(f"Erro no handler: {e}")
            finally:
                self.connected = False
                self.websocket_client = None
                log.info("Cliente desconectado")
            
            return ws
        
        # Cria app aiohttp
        self.app = web.Application()
        self.app.router.add_get('/ws', websocket_handler)
        
        # Adiciona rota de status
        async def status_handler(request):
            return web.json_response({
                "status": "running",
                "connected": self.connected
            })
        
        self.app.router.add_get('/status', status_handler)
        
        # Inicia servidor
        self.runner = web.AppRunner(self.app)
        await self.runner.setup()
        site = web.TCPSite(self.runner, 'localhost', port)
        await site.start()
        
        log.info(f"🌐 Servidor WebSocket rodando em ws://localhost:{port}/ws")
        
    async def connect(self, callback: Optional[Callable] = None):
        """
        'Conecta' ao sistema LEGO Weba
        Na verdade, apenas aguarda a página web conectar ao nosso servidor
        """
        self._response_callback = callback
        
        if not self.runner:
            await self.start_server()
        
        log.info("⏳ Aguardando conexão da página LEGO Education...")
        log.info("💡 Execute o script no console do navegador!")
        
        # Aguarda conexão (timeout 60s)
        for i in range(60):
            if self.connected:
                log.info("✅ Página LEGO conectada!")
                return True
            await asyncio.sleep(1)
        
        log.error("❌ Timeout: página não conectou")
        return False
    
    async def send_python_code(self, code: str) -> bool:
        """Envia código Python para execução no Spike Prime"""
        if not self.connected or not self.websocket_client:
            log.error("Não conectado à página LEGO")
            return False
        
        try:
            message = {
                "type": "execute_python",
                "code": code
            }
            
            await self.websocket_client.send_json(message)
            log.info("📤 Código enviado à página LEGO")
            return True
            
        except Exception as e:
            log.error(f"Erro ao enviar código: {e}")
            return False
    
    async def disconnect(self):
        """Desconecta e para o servidor"""
        if self.websocket_client:
            await self.websocket_client.close()
        
        if self.runner:
            await self.runner.cleanup()
        
        self.connected = False
        log.info("Desconectado")


# ==========================================
# SCRIPT PARA INJETAR NO NAVEGADOR
# ==========================================

BROWSER_INJECT_SCRIPT = """
// ==================================================
// SCRIPT PARA COLAR NO CONSOLE DO NAVEGADOR
// Página: spike.legoeducation.com
// ==================================================

(function() {
    console.log('🔌 Conectando ao backend...');
    
    const ws = new WebSocket('ws://localhost:8765/ws');
    
    ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    console.log('📥 Comando recebido:', data);
    
    if (data.type === 'execute_python') {
        try {
            console.log('🚀 Tentando executar comando Python/JS:', data.code);
            
            let executed = false;

            // 1. Tenta usar o serviço de programa principal (API comum em ambientes LEGO)
            if (window.ProgramManager && window.ProgramManager.executeProgram) {
                // A LEGO pode esperar o código Python puro, não o código JS.
                // Mas, como seu backend envia código JS, vamos tentar executar direto.
                // Se falhar, é porque a API espera Python.
                await window.ProgramManager.executeProgram(data.code);
                console.log('✅ Executado via window.ProgramManager.executeProgram');
                executed = true;
            } 
            
            // 2. Se a primeira falhar, tenta a execução direta (sua tentativa anterior)
            if (!executed) {
                eval(data.code);
                console.log('✅ Executado via eval()');
                executed = true;
            }

            if (!executed) {
                throw new Error("Nenhuma API de execução de código encontrada (ProgramManager ou eval falhou).");
            }
            
            ws.send(JSON.stringify({
                type: 'response',
                status: 'success'
            }));
            
        } catch (error) {
            console.error('❌ Erro na execução do comando:', error);
            ws.send(JSON.stringify({
                type: 'response',
                status: 'error',
                error: error.message
            }));
        }
    }
};

// ==================================================
// INSTRUÇÕES:
// 1. Abra spike.legoeducation.com
// 2. Conecte ao Spike Prime
// 3. Abra o Console (F12)
// 4. Cole este script e dê Enter
// 5. Volte ao seu frontend e conecte
// ==================================================
"""


# ==========================================
# COMANDOS
# ==========================================

class LegoWebCommands:
    """Comandos JavaScript para executar na página LEGO"""
    
    @staticmethod
    def motor_run(port: str, speed: int, duration: float = 1.0) -> str:
        """Comando para rodar motor (JavaScript)"""
        return f"""
(async () => {{
    await motor.run({port}, {speed});
    await new Promise(r => setTimeout(r, {int(duration*1000)}));
    await motor.stop({port});
}})();
"""
    
    @staticmethod
    def motors_run(port1: str, speed1: int, port2: str, speed2: int, duration: float = 1.0) -> str:
        """Roda dois motores"""
        return f"""
(async () => {{
    await motor.run({port1}, {speed1});
    await motor.run({port2}, {speed2});
    await new Promise(r => setTimeout(r, {int(duration*1000)}));
    await motor.stop({port1});
    await motor.stop({port2});
}})();
"""


def create_web_command_map():
    """Comandos para enviar via página web"""
    
    commands = {
        "andar": LegoWebCommands.motors_run(0, 800, 2, 800, 1.0),  # Portas A=0, C=2
        "virar_direita": LegoWebCommands.motors_run(0, 600, 2, -600, 0.5),
        "virar_esquerda": LegoWebCommands.motors_run(0, -600, 2, 600, 0.5),
        "parar": "(async()=>{await motor.stop(0);await motor.stop(2);})();",
        "beep": "sound.beep(440, 200);",
        "test": "sound.beep(440, 300);",
    }
    
    return commands


LEGO_WEB_COMMAND_MAP = create_web_command_map()


# ==========================================
# INSTRUÇÕES DE USO
# ==========================================

def print_instructions():
    """Imprime instruções de uso"""
    print("\n" + "="*70)
    print("📋 COMO USAR O LEGO WEB BRIDGE")
    print("="*70 + "\n")
    
    print("1️⃣  Abra https://spike.legoeducation.com no navegador")
    print("2️⃣  Conecte ao Spike Prime pela página")
    print("3️⃣  Abra o Console do navegador (F12 → Console)")
    print("4️⃣  Cole o script abaixo e dê Enter:\n")
    
    print("-" * 70)
    print(BROWSER_INJECT_SCRIPT)
    print("-" * 70)
    
    print("\n5️⃣  Inicie seu backend Python")
    print("6️⃣  Conecte pelo frontend\n")
    print("="*70 + "\n")


# ==========================================
# TESTE
# ==========================================

async def test_web_bridge():
    """Testa o bridge web"""
    bridge = LegoWebBridge()
    
    print_instructions()
    
    input("\n⏸️  Pressione ENTER depois de colar o script no navegador...")
    
    print("\n🔌 Iniciando servidor...")
    connected = await bridge.connect()
    
    if not connected:
        print("\n❌ Página não conectou")
        print("   Verifique se colou o script no console!\n")
        return
    
    print("\n✅ Conectado!")
    
    # Teste beep
    print("\n📢 Enviando beep...")
    await bridge.send_python_code(LEGO_WEB_COMMAND_MAP["beep"])
    await asyncio.sleep(2)
    
    heard = input("\nOuviu o beep? (s/n): ").lower()
    
    if heard == 's':
        print("\n🎉 Funcionou! Testando movimento...")
        await bridge.send_python_code(LEGO_WEB_COMMAND_MAP["andar"])
        await asyncio.sleep(2)
        
        moved = input("\nRobô se moveu? (s/n): ").lower()
        
        if moved == 's':
            print("\n🎉🎉 PERFEITO! Sistema funcionando!\n")
        else:
            print("\n⚠️  Som ok, movimento não. Verifique portas dos motores\n")
    else:
        print("\n❌ Não funcionou. Verifique o console do navegador\n")
    
    await bridge.disconnect()


if __name__ == "__main__":
    asyncio.run(test_web_bridge())