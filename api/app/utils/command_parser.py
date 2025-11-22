COMMAND_MAP = {
    "andar": "motor_pair.move(10, 'cm')", 
    "virar_esquerda": "motor_pair.move_tank(180, -180, 'degrees')",
    "virar_direita": "motor_pair.move_tank(-180, 180, 'degrees')",
    "parar": "motor_pair.stop()"
}

def parse_command(blockly_command: str) -> str:
    cmd = COMMAND_MAP.get(blockly_command)
    if cmd:
        return cmd + "\r\n" 
    return None

def parse_command_list(commands: list[str]) -> list[str]:
    parsed = []
    for cmd in commands:
        code = parse_command(cmd)
        if code:
            parsed.append(code)
    return parsed