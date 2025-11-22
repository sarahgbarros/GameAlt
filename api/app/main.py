from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import models
from .database.database import engine
from .routes import robot_routes

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Robot Control API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(robot_routes.router, prefix="/api/robot", tags=["Robot Control"])

@app.get("/")
def root():
    return {"message": "API do robô online e conectada!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)