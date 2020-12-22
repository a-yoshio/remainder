from app.form import (None_check, str_check, int_check, datetime_check, bool_check)

class Auth:
    def __init__(self, mail_address: str, password: str):
        self.mail_address = mail_address
        self.password = password

    def validation(self):
        str_check('mail_address', self.mail_address)
        str_check('password', self.password)
