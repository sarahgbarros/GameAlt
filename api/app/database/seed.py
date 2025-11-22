from sqlalchemy.orm import Session
from . import models, database

# Criar as tabelas (caso ainda não tenham sido criadas)
models.Base.metadata.create_all(bind=database.engine)

# Abrir uma sessão com o banco
db: Session = database.SessionLocal()

# Verificar se já existe um usuário admin
admin_user = db.query(models.User).filter_by(email="admin@teste.com").first()

if not admin_user:
    # Criar o usuário admin
    novo_admin = models.User(
        nome="Admin",
        email="admin@teste.com",
        senha="123",   # 🔒 por enquanto sem hash, simples
        plano="Premium",
        contagem_comandos=0,
        limite_diario=999
    )
    db.add(novo_admin)
    db.commit()
    db.refresh(novo_admin)
    print("✅ Usuário admin criado com sucesso!")
else:
    print("ℹ️ Usuário admin já existe.")

# Fechar sessão
db.close()
