from app.api.api import (db)
from app.form.remainder import (Remainder)

class RemainderModel(db.Model):
    __tablename__ = 'remainder'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    contents = db.Column(db.String(100), null_able=False)
    user_id = db.Column(db.Integer, null_able=False)
    tag_id = db.Column(db.Integer, null_able=False)
    datetime = db.Column(db.DateTime, null_able=False)
    complete = db.Column(db.Boolean, null_able=False)

    def to_dict(self):
        return {
            'id': self.id,
            'contents': self.contents,
            'user_id': self.user_id,
            'tag_id': self.tag_id,
            'datetime': self.datetime,
            'complete': self.complete
        }

    def set_param(self, remainder_form: Remainder):
        self.user_id = remainder_form.user_id
        self.contents = remainder_form.contents
        self.tag_id = remainder_form.tag_id
        self.datetime = remainder_form.parse_date_type()
        self.complete = remainder_form.complete
        if remainder_form.remainder_id != 0:
            self.id = remainder_form.remainder_id