from fastapi import WebSocket

connected_clients = []

async def handle_connection(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Comando recebido via WS: {data}")
            await websocket.send_text(f"Executando: {data}")
    except Exception:
        print("Cliente desconectado")
    finally:
        connected_clients.remove(websocket)
