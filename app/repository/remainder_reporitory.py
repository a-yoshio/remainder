import datetime as dt
from app.models.remainder_model import RemainderModel
from app.repository import (db, convert_qury_data_to_list)
from app.repository.tag_repostiory import TagRepository


class RemainderRepository:
    def __init__(self):
        self.tag_repostitory = TagRepository()

    def get_all(self):
        remainder_list = RemainderModel.all()
        return convert_qury_data_to_list(remainder_list)

    def get_with_remainder_id(self, remainder_id: int):
        remainder_list = RemainderModel.query.filter_by(id=remainder_id).all()
        return convert_qury_data_to_list(remainder_list)

    def get_with_user_id(self, user_id: int):
        remainder_list = RemainderModel.query.filter_by(user_id=user_id).all()
        return convert_qury_data_to_list(remainder_list)

    def update(self, remainder_id: object, contents: str, user_id: int, tag_id: int, datetime: dt, complete: bool):
        print('start remainder update or insert')
        # checking for tag existence
        if len(self.tag_repostitory.get_with_tag_id(tag_id)) == 0:
            raise ValueError(f'tag_id "{tag_id}" is not existing.')
        # checking for remainder existence
        if remainder_id is not None:
            if len(self.get_with_remainder_id(remainder_id)) > 0:
                # update
                remainder_data = db.session.query(RemainderModel).filter_by(id=remainder_id).first()
                remainder_data.contents = contents
                remainder_data.tag_id = tag_id
                remainder_data.datetime = datetime
                remainder_data.complete = complete
                db.session.add(remainder_data)
                db.session.commit()
                print('remainder update')
                return True, 'update success'
        # insert
        model = RemainderModel(contents=contents, user_id=user_id, tag_id=tag_id, datetime=datetime, complete=complete)
        db.session.add(model)
        print('remainder insert')
        db.session.commit()
        return True, 'insert success'

