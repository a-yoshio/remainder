from app.api.api import (db)
from app.repository import (convert_qury_data_to_list)
from app.models.tag_model import TagModel
from app.form.remainder import Remainder as RemainderForm

class TagRepository:
    def get_all(self):
        tag_list = TagModel.all()
        return convert_qury_data_to_list(tag_list)


    def get_with_tag_id(self, tag_id: object):
        print('check tag')
        tag_data_list = []
        if tag_id is not None:
            tag_data_list = TagModel.query.filter_by(id=tag_id).all()
        return convert_qury_data_to_list(tag_data_list)

    def insert(self, remainder: RemainderForm):
        model = TagModel(title=title, color=color, user_id=user_id)
        db.session.add(model)
        print('insert tag data')
        db.session.commit()
        return convert_qury_data_to_list(model)

    def update(self, tag_id: object, title: str, color: str, user_id: int):
        print('start insert or update tag data')
        if tag_id is not None:
            if len(self.get_with_tag_id(tag_id)) > 0:
                # update
                tag_data = db.session.query(TagModel).filter_by(id=tag_id).first()
                tag_data.title = title
                tag_data.color = color
                print('update tag data')
                db.session.add(tag_data)
                db.session.commit()
                return convert_qury_data_to_list(tag_data)
        # insert
        model = TagModel(title=title, color=color, user_id=user_id)
        db.session.add(model)
        print('insert tag data')
        db.session.commit()
        return convert_qury_data_to_list(model)

    def tag_exesting_check(self, tag_id):
        if len(self.get_with_tag_id(tag_id)) == 0:
            raise ValueError(f'tag_id "{tag_id}" is not existing.')

