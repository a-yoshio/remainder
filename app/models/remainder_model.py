from app.api.api import db

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