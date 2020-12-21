from flask_sqlalchemy import SQLAlchemy
from app.repository.base_repository import BaseRepository
from app.models.tag_model import TagModel
from app.form.tag import Tag as TagForm

db = SQLAlchemy()

class TagRepository(BaseRepository):

    def get_all(self):
        tag_list = TagModel.all()
        return super().convert_query_data_to_list(tag_list)

    def get_with_tag_id(self, tag_id: object):
        print('check tag')
        tag_data_list = []
        if tag_id is not None:
            tag_data_list = TagModel.query.filter_by(id=tag_id).all()
        return super().convert_query_data_to_list(tag_data_list)


    def get_with_user_id(self, tag_id: int):
        remainder_list = TagModel.query.filter_by(user_id=tag_id).all()
        return super().convert_query_data_to_list(remainder_list)


    def insert(self, tag_from: TagForm):
        model = TagModel()
        model.set_param(tag_from)
        self.add_commit(model)
        return True, 'insert success'

    def update(self, tag: TagForm):
        print('start insert or update tag data')
        # checking remainder existence
        if len(self.get_with_tag_id(tag.id)) == 0 \
                or tag.id == 0:
            print('[WARN]This form is not for updating. I will insert it.')
            self.insert(tag)
        # update
        tag_model: TagModel = db.session.query(TagModel).filter_by(id=tag.id).first()
        tag_model.set_param(tag)
        self.add_commit(tag_model)


    def delete(self, tag_id:int):
        try:
            tag = TagModel.query.filter_by(id=tag_id).first()
            db.session.delete(tag)
            return True, 'delete success'
        except BaseException as e:
            db.session.rollback()
            raise e


    def tag_exesting_check(self, tag_id):
        if len(self.get_with_tag_id(tag_id)) == 0:
            raise ValueError(f'tag_id "{tag_id}" is not existing.')

