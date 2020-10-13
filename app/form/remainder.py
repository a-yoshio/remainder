from app.form import (None_check, str_check, int_check, datetime_check, bool_check)

class Remainder:

    def __init__(self, request_params: dict):
        print(request_params)
        self.id = None_check('remainder_id', request_params['remainder_id'])
        self.user_id = int_check('user_id', request_params['user_id'])
        self.contents = str_check('contents', request_params['contents'])
        self.tag_id = int_check('tag_id', request_params['tag_id'])
        self.datetime = datetime_check('datetime', request_params['datetime'])
        self.complete = bool_check('complete', request_params['complete'])

