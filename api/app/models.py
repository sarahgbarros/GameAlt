from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False)
    plano = Column(String, default="Free")  # pode ser "Free" ou "Premium"
    contagem_comandos = Column(Integer, default=0)
    limite_diario = Column(Integer, default=10)  # exemplo: 10 comandos por dia

    # relacionamento: 1 usuário -> várias execuções
    execucoes = relationship("Execucao", back_populates="user")


class Execucao(Base):
    __tablename__ = "execucoes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    data = Column(DateTime, default=datetime.utcnow)
    quantidade_comandos = Column(Integer, default=0)

    # relacionamento inverso
    user = relationship("User", back_populates="execucoes")
