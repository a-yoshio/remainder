from app.models.tag_model import TagModel
from app.repository.remainder_reporitory import RemainderRepository
from app.repository.tag_repository import TagRepository
from app.form.remainder import (Remainder)
from app.models.remainder_model import RemainderModel

repository = RemainderRepository()
tag_repository = TagRepository()

def get(id: int):
    remainder_model:RemainderModel = repository.get_with_remainder_id(id)
    tag_model = tag_repository.get_with_tag_id(remainder_model.tag_id)
    return createResponseData(remainder_model, tag_model)

def get_with_user_id(user_id: int):
    remainder_list = repository.get_with_user_id(user_id)
    remainder_dict_list = []
    for (remainder, tag) in remainder_list:
        data = createResponseData(remainder, tag)
        remainder_dict_list.append(data)
    return remainder_dict_list


def add_remainder(remainder: Remainder):
    tag_repository.tag_exesting_check(remainder.tag.id)

    remainder_model = RemainderModel()
    remainder_model.set_param(remainder)
    return repository.insert(remainder)

def update_remainder(remainder: Remainder):
    tag_repository.tag_exesting_check(remainder.tag.id)

    return repository.update(remainder)

def delete(remainder_id: int, user_id: int):
    return repository.delete(remainder_id, user_id)

def createResponseData(remainder: RemainderModel, tag: TagModel):
    remainder_dict = remainder.to_dict()
    remainder_dict['tag'] = tag.to_dict()
    return remainder_dict

