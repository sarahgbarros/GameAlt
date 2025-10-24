COMMAND_MAP = {
    "andar": "F",
    "virar_esquerda": "L",
    "virar_direita": "R",
    "parar": "S"
}

def parse_command(blockly_command: str) -> str:
    return COMMAND_MAP.get(blockly_command)

def parse_command_list(commands: list[str]) -> list[str]:
    parsed = []
    for cmd in commands:
        code = parse_command(cmd)
        if code:
            parsed.append(code)
    return parsed