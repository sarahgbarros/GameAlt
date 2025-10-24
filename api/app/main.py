from fastapi import FastAPI, WebSocket
from app.routes import robot_routes

app = FastAPI(title="Robot Control API")

app.include_router(robot_routes.router, prefix="/robot", tags=["Robot"])

@app.get("/")
def root():
    return {"message": "API do robô online 🚀"}
