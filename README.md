# 🟢 GameAlt — Robot Control API

**GameAlt** é uma API backend em **FastAPI** para controlar **robôs Bluetooth/Serial**, incluindo LEGO, via **comandos do Blockly** ou **WebSocket em tempo real**.

---

## 🧾 Tecnologias

- Python 3.13  
- FastAPI  
- Uvicorn  
- PySerial  
- WebSockets  
- Pydantic  
- python-dotenv  

---

## ⚙️ Pré-requisitos

- Python 3.13  
- Robô com suporte a **Serial / Bluetooth Serial**  
- Porta Serial do robô identificada (`COMx` no Windows, `/dev/ttyUSBx` no Linux/Mac)  

---

## 🛠 Instalação

1. Clone o repositório:

```bash
git clone <seu_repositorio_url>
cd backend

python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
