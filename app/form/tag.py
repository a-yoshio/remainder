from app.form import (None_check, str_check, int_check)

class Tag:

    def __validation(self):
        str_check('title', self.title)
        str_check('color', self.color)
        int_check('user_id', self.user_id)

    def __init__(self, title: str, color: str, user_id: int, tag_id = -1):
        self.id = tag_id
        self.title = title
        self.color = color
        self.user_id = user_id

    def validateForInsert(self):
        self.__validation()

    def validateForUpdate(self):
        int_check('tag_id', self.id)
        self.__validation()