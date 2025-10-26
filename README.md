Backend em FastAPI com banco SQLite para controle do robô.
Esta primeira parte cobre apenas a estrutura inicial e banco de dados.


🚀 Tecnologias

Python 3.13

FastAPI + Uvicorn

SQLAlchemy + SQLite



⚙️ Como rodar

Clone o projeto e entre na pasta api:

python -m venv .venv
.venv\Scripts\activate   # Windows

source .venv/bin/activate   # Linux/Mac

pip install -r requirements.txt
uvicorn app.main:app --reload


Abra no navegador:
👉 http://127.0.0.1:8000

Documentação automática:

Swagger: /docs

Redoc: /redoc


✅ Parte A concluída

Projeto base com FastAPI configurado

Banco SQLite + SQLAlchemy integrados

Modelos criados: User e Execucao

Tabelas geradas no app.db

Seed inicial (usuário admin)
