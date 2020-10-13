from app.form import (None_check, str_check, int_check)

class Tag:

    def __init__(self, request_params: dict):
        self.id = None_check('tag_id', request_params['tag_id'])
        self.title = str_check('title', request_params['title'])
        self.colors = str_check('colors', request_params['colors'])
        self.user_id = int_check('user_id', request_params['user_id'])
