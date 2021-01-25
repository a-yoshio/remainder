from app.repository.user_repository import UserRepository

repository = UserRepository()

def get(id: int):
    return repository.get(id)

def update_fcm_token(user_id: int, fcm_token: int):
    return repository.update_fcm_token(user_id, fcm_token)