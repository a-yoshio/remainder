from app.repository.user_repository import UserRepository

repository = UserRepository()

def get(id: int):
    return repository.get(id)

