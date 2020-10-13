from app.repository.remainder_reporitory import RemainderRepository
from app.form.remainder import (Remainder)

repository = RemainderRepository()

def get_list_with_user_id(user_id: str):
    return repository.get_with_user_id(user_id)


def add_remainder(data: Remainder):
    try:
        print('start add')
        return repository.update(data.id, data.contents, data.user_id, data.tag_id, data.datetime, data.complete)
    except Exception as e:
        print(f'{e} : failed for add new remainder data')
        return False, f'{e} : failed for add new remainder data'