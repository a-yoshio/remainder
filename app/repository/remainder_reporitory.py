from flask_sqlalchemy import SQLAlchemy
from app.models.remainder_model import RemainderModel
from app.models.tag_model import TagModel
from app.repository import (convert_query_data_to_list, check_user)
from app.form.remainder import Remainder as RemainderForm

db = SQLAlchemy()

class RemainderRepository():

    def get_all(self):
        remainder_list = RemainderModel.all()
        return convert_query_data_to_list(remainder_list)

    def get_with_remainder_id(self, remainder_id: int):
        remainder = RemainderModel.query.filter_by(id=remainder_id).one_or_none()
        return remainder

    def get_with_user_id(self, user_id: int):
        remainder_list = db.session.query(RemainderModel, TagModel).join(TagModel, RemainderModel.tag_id==TagModel.id)\
            .filter(RemainderModel.user_id == user_id).filter(RemainderModel.complete == False).all()
        return remainder_list

    def insert(self, remainder: RemainderForm):
        try:
            print('start remainder insert')
            remainder_model = RemainderModel()
            remainder_model.set_param(remainder)
            db.session.add(remainder_model)
            db.session.commit()

            return True, 'insert success'
        except BaseException as e:
            db.session.rollback()
            raise e

    def update(self, remainder: RemainderForm):
        print('start remainder update')
        # update
        try:
            print('start remainder update')
            remainder_model = db.session.query(RemainderModel).filter_by(id=remainder.remainder_id).first()

            check_user(remainder_model.user_id, remainder.user_id)
            remainder_model.set_param(remainder)
            db.session.add(remainder_model)
            db.session.commit()

            return True, 'update success'
        except BaseException as e:
            db.session.rollback()
            raise e

    def delete(self, remainder_id:int, user_id: int):
        try:
            remainder_model = db.session.query(RemainderModel).filter_by(id=remainder_id).first()

            check_user(remainder_model.user_id, user_id)

            db.session.delete(remainder_model)
            db.session.commit()
            return True, 'delete success'
        except BaseException as e:
            db.session.rollback()
            raise e