from app.repository.tag_repository import TagRepository
from app.form.tag import Tag

repository = TagRepository()

def get(id: int):
    return repository.get_with_tag_id(id)

def get_with_user_id(user_id: int):
    return repository.get_with_user_id(user_id)


def add_tag(tag: Tag):
    return repository.insert(tag)

def update_tag(tag: Tag):
    return repository.update(tag)

def delete(tag_id: int, user_id: int):
    return repository.delete(tag_id, user_id)

