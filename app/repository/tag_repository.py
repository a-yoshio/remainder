from flask_sqlalchemy import SQLAlchemy
from app.repository import convert_query_data_to_list
from app.models.tag_model import TagModel
from app.form.tag import Tag as TagForm

db = SQLAlchemy()

class TagRepository():

    def get_all(self):
        tag_list = TagModel.all()
        return convert_query_data_to_list(tag_list)

    def get_with_tag_id(self, tag_id: object):
        print('check tag')
        tag_data = TagModel.query.filter_by(id=tag_id).one_or_none()
        return tag_data.to_dict()


    def get_with_user_id(self, tag_id: int):
        remainder_list = TagModel.query.filter_by(user_id=tag_id).all()
        return convert_query_data_to_list(remainder_list)


    def insert(self, tag_from: TagForm):
        try:
            model = TagModel()
            model.set_param(tag_from)
            db.session.add(model)
            db.session.commit()
            return True, 'insert success'
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, tag: TagForm):
        try:
            print('start insert or update tag data')
            # update
            tag_model: TagModel = db.session.query(TagModel).filter_by(id=tag.id).first()
            tag_model.set_param(tag)
            db.session.add(tag_model)
            db.session.commit()
            return True, 'update success'
        except BaseException as e:
            db.session.rollback()
            raise e

    def delete(self, tag_id:int):
        try:
            tag = db.session.query(TagModel).filter_by(id=tag_id).first()
            db.session.delete(tag)
            db.session.commit()
            return True, 'delete success'
        except BaseException as e:
            db.session.rollback()
            raise e


    def tag_exesting_check(self, tag_id):
        if len(self.get_with_tag_id(tag_id)) == 0:
            raise ValueError(f'tag_id "{tag_id}" is not existing.')

