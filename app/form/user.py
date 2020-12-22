from app.form import (None_check, str_check, int_check, datetime_check, bool_check)

class User:
    def __validation(self):
        int_check('id', self.id)
        str_check('name', self.name)
        int_check('password', self.password)
        datetime_check('mail_address', self.mail_address)

    def __init__(self, name: str, password: str, mail_address: str, id = 0):
        self.id = id
        self.name = name
        self.password = password
        self.mail_address = mail_address

    def validateForInsert(self):
        self.__validation()

    def validateForUpdate(self):
        int_check('id', self.id)
        self.__validation()