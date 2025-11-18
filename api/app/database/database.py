from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Caminho do banco SQLite (vai criar app.db na raiz do projeto)
DATABASE_URL = "sqlite:///./app.db"

# Engine = conexão com o banco
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Session = usada para conversar com o banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = classe base para os modelos (User, Execucao, etc.)
Base = declarative_base()
