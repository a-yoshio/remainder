from flask_sqlalchemy import SQLAlchemy
from app.form.user import User
from datetime import datetime

db = SQLAlchemy()

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), null_able=False)
    password = db.Column(db.String(255), null_able=False)
    mail_address = db.Column(db.String(255), null_able=False)
    last_login = db.Column(db.DateTime)
    fcm_token = db.Column(db.String(255), null_able=True)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'mail_address': self.mail_address,
            'password': self.password
        }

    def set_param(self, form: User):
        self.mail_address = form.mail_address
        self.password = form.password
        self.name = form.name
        if form.id != 0:
            self.id = form.id

    def update_fcm_token(self, new_fcm_token):
        self.fcm_token = new_fcm_token

    def update_last_login_date(self):
        self.last_login = datetime.now()
