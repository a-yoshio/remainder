from app.form import (None_check, str_check, int_check, datetime_check, bool_check)
from datetime import datetime

class Remainder:

    def __validation(self):
        int_check('user_id', self.user_id)
        str_check('contents', self.contents)
        int_check('tag_id', self.tag_id)
        datetime_check('datetime', self.datetime)
        bool_check('complete', self.complete)

    def __init__(self, user_id: int, contents: str, tag_id: int, datetime: str, complete: bool, remainder_id= -1):
        self.remainder_id = remainder_id
        self.user_id = user_id
        self.contents = contents
        self.tag_id = tag_id
        self.datetime = datetime
        self.complete = complete

    def validateForInsert(self):
        self.__validation()

    def validateForUpdate(self):
        int_check('remainder_id', self.remainder_id)
        self.__validation()

    def parse_date_type(self):
        return datetime.strptime(self.datetime, '%Y%m%d%H%M')
