"""
Comandos LEGO Spike Prime via BLE
Protocolo REPL - Funciona via Bluetooth
"""
import json
import struct


class SpikeCommands:
    """Gerador de comandos para LEGO Spike Prime via BLE"""
    
    @staticmethod
    def repl_command(code: str) -> bytes:
        """
        Envia comando via REPL (MicroPython console)
        Tentativa simples: apenas o código + enter
        """
        # Apenas o código com quebra de linha
        return code.encode('utf-8') + b'\r\n'


# ==========================================
# MAPA DE COMANDOS
# ==========================================

def create_command_map():
    """Comandos para o robô via REPL"""
    
    commands = {
        # ===== COMANDOS PRINCIPAIS =====
        
        "andar": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.D,800);motor.run(port.C,800);import('time').sleep(1);motor.stop(port.D);motor.stop(port.C)"
        ),
        "virar_direita": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.D,600);motor.run(port.C,-600);import('time').sleep(0.5);motor.stop(port.D);motor.stop(port.C)"
        ),
        "virar_esquerda": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.D,-600);motor.run(port.C,600);import('time').sleep(0.5);motor.stop(port.D);motor.stop(port.C)"
        ),
        "parar": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.stop(port.D);motor.stop(port.C)"
        ),
        
        # ===== TESTE =====
        
        "test": SpikeCommands.repl_command(
            "from hub import sound;sound.beep(440,300)"
        ),
        
        "beep": SpikeCommands.repl_command(
            "from hub import sound;sound.beep(440,200)"
        ),
        
        "smile": SpikeCommands.repl_command(
            "from hub import light_matrix;light_matrix.show_image(light_matrix.IMAGE_HAPPY)"
        ),
        
        # ===== TESTES DE MOTOR INDIVIDUAL =====
        
        "test_motor_a": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.A,800);__import__('time').sleep(2);motor.stop(port.A)"
        ),
        
        "test_motor_b": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.B,800);__import__('time').sleep(2);motor.stop(port.B)"
        ),
        
        "test_motor_c": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.C,800);__import__('time').sleep(2);motor.stop(port.C)"
        ),
        
        "test_motor_d": SpikeCommands.repl_command(
            "import motor;from hub import port;motor.run(port.D,800);__import__('time').sleep(2);motor.stop(port.D)"
        ),
    }
    
    return commands


# Exporta o mapa de comandos
COMMAND_MAP = create_command_map()


if __name__ == "__main__":
    print("\n" + "="*60)
    print("📋 COMANDOS SPIKE PRIME (VIA REPL)")
    print("="*60 + "\n")
    
    print("Comandos principais:")
    for cmd in ["andar", "virar_direita", "virar_esquerda", "parar"]:
        print(f"  • {cmd}")
    
    print("\nTestes:")
    for cmd in ["test", "beep", "smile"]:
        print(f"  • {cmd}")
    
    print("\nTestes de motor individual:")
    for cmd in ["test_motor_a", "test_motor_b", "test_motor_c", "test_motor_d"]:
        print(f"  • {cmd}")
    
    print(f"\nTotal: {len(COMMAND_MAP)} comandos")
    print("\n Usando portas A e C para movimento")
    print("   Se não funcionar, teste test_motor_a, test_motor_b, etc.\n")