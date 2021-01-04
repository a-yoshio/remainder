from app.repository.remainder_reporitory import RemainderRepository
from app.repository.tag_repository import TagRepository
from app.form.remainder import (Remainder)
from app.models.remainder_model import RemainderModel

repository = RemainderRepository()

def get(id: int):
    return repository.get_with_remainder_id(id).to_dict()

def get_with_user_id(user_id: int):
    return repository.get_with_user_id(user_id)


def add_remainder(remainder: Remainder):
    tag_repository = TagRepository()
    tag_repository.tag_exesting_check(remainder.tag_id)

    remainder_model = RemainderModel()
    remainder_model.set_param(remainder)
    return repository.insert(remainder)

def update_remainder(remainder: Remainder):
    tag_repository = TagRepository()
    tag_repository.tag_exesting_check(remainder.tag_id)

    return repository.update(remainder)

def delete(remainder_id: int, user_id: int):
    return repository.delete(remainder_id, user_id)

