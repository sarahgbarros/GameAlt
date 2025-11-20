# 🤖 Controle de Robô LEGO Spike Prime via Web

Este guia contém as instruções passo a passo para configurar o hardware, parear o Bluetooth e rodar a aplicação (Backend e Frontend).

---

## 🔌 Parte 1: Configuração do Hardware (Bluetooth)

Antes de rodar o código, o Windows precisa reconhecer o robô como uma porta serial (COM).

1.  **Ligue o LEGO Spike Prime** (Botão central).
2.  **Ative o Modo Pareamento:** Segure o botão de Bluetooth (topo do Hub) até começar a piscar **azul**.
3.  **No Windows:**
    * Vá em `Configurações` > `Dispositivos` > `Bluetooth e outros dispositivos`.
    * Clique em **Adicionar Bluetooth ou outro dispositivo**.
    * Selecione **Bluetooth**.
    * Clique em **LEGO Spike** (ou LEGO Hub) para parear.
4.  **Identificar a Porta COM:**
    * Clique com o botão direito no **Menu Iniciar** e abra o **Gerenciador de Dispositivos**.
    * Expanda a seção **Portas (COM e LPT)**.
    * Procure por `Standard Serial over Bluetooth link`.
    * **Anote o número da porta** (Exemplo: `COM3`, `COM4`).
    * *Dica: Se houver duas, geralmente é a de número menor.*

> **⚠️ IMPORTANTE:** Feche o aplicativo oficial da LEGO Spike se ele estiver aberto. Ele bloqueia a conexão e impede que a API funcione.

---

## ⚙️ Parte 2: Configuração do Código

Antes de iniciar, precisamos apontar o código para a porta correta e desativar o modo de simulação.

### 1. Configurar Porta e Baudrate
Abra o arquivo `api/app/services/robot_service.py`:

```python
class RobotService:
    def __init__(self, ...):
        # Mude "COM4" para a porta que você anotou no Gerenciador de Dispositivos
        self.port = os.getenv("SERIAL_PORT", "COM4")
```

### 2. Mude para False para usar o robô real

MOCK_MODE = False

---

## 🚀 Parte 3: Rodando o projeto

### 1. Inicie um ambiente virtual

python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

### 2. Instale as dependencias

pip install -r requirements.txt
pip install "uvicorn[standard]" serial pyserial

### 3. Inicie o servidor

uvicorn main:app --reload --port 8000