from app.api.api import db

class TagModel(db.Model):
    __tablename__ = 'tag'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(20), null_able=False)
    color = db.Column(db.String(6), null_able=False)
    user_id = db.Column(db.Integer, null_able=False)


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'color': self.color,
            'user_id': self.user_id
        }