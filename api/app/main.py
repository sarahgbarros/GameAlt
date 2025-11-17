from fastapi import FastAPI, WebSocket
from app.routes import robot_routes
from . import models
from .database import engine

# Criar as tabelas no banco de dados quando a API iniciar
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Robot Control API")

app.include_router(robot_routes.router, prefix="/robot", tags=["Robot"])

@app.get("/")
def root():
    return {"message": "API do robô online 🚀"}
