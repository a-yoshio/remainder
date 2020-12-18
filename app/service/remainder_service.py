from app.repository.remainder_reporitory import RemainderRepository
from app.repository.tag_repository import TagRepository
from app.form.remainder import (Remainder)

repository = RemainderRepository()

def get(id: int):
    return repository.get_with_remainder_id(id)

def get_with_user_id(user_id: int):
    return repository.get_with_user_id(user_id)


def add_remainder(remainder: Remainder):
    tag_repository = TagRepository()
    return repository.insert(remainder, tag_repository)

def update_remainder(remainder: Remainder):
    tag_repository = TagRepository()
    return repository.update(remainder, tag_repository)

def delete(remainder_id: int):
    return repository.delete(remainder_id)

