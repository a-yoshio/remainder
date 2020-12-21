from flask_sqlalchemy import SQLAlchemy
from app.models.remainder_model import RemainderModel
from app.repository import convert_query_data_to_list
from app.form.remainder import Remainder as RemainderForm
from app.repository.tag_repository import TagRepository

db = SQLAlchemy()

class RemainderRepository():

    def get_all(self):
        remainder_list = RemainderModel.all()
        return convert_query_data_to_list(remainder_list)

    def get_with_remainder_id(self, remainder_id: int):
        remainder = RemainderModel.query.filter_by(id=remainder_id).one_or_none()
        return remainder.to_dict()

    def get_with_user_id(self, user_id: int):
        remainder_list = RemainderModel.query.filter_by(user_id=user_id).all()
        return convert_query_data_to_list(remainder_list)

    def insert(self, remainder: RemainderForm, tag_repository: TagRepository):
        try:
            tag_repository.tag_exesting_check(remainder.tag_id)
            print('start remainder insert')
            remainder_model = RemainderModel()
            remainder_model.set_param(remainder)
            db.session.add(remainder_model)
            db.session.commit()

            return True, 'insert success'
        except BaseException as e:
            db.session.rollback()
            raise e

    def update(self, remainder: RemainderForm, tag_repository: TagRepository):
        print('start remainder update')
        # checking for tag existence
        tag_repository.tag_exesting_check(remainder.tag_id)
        # update
        try:
            print('start remainder update')
            remainder_model = db.session.query(RemainderModel).filter_by(id=remainder.remainder_id).first()
            remainder_model.set_param(remainder)
            db.session.add(remainder_model)
            db.session.commit()

            return True, 'update success'
        except BaseException as e:
            db.session.rollback()
            raise e

    def delete(self, remainder_id:int):
        try:
            remainder = db.session.query(RemainderModel).filter_by(id=remainder_id).first()
            db.session.delete(remainder)
            db.session.commit()
            return True, 'delete success'
        except BaseException as e:
            db.session.rollback()
            raise e
