from flask import (Flask, jsonify, request)
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import app.service.remainder_service as remainder_service
from app.config.application_config import configure_app
from app.form.remainder import (Remainder)
from app.form import (int_check)

app = Flask(__name__, instance_relative_config='')
configure_app(app)
cors = CORS(app)
db = SQLAlchemy()

@app.route('/hello')
def hello():
    return 'Hello takoyaki'

@app.route('/remainder/<user_id>', methods=['GET'])
def get_remainder_list(user_id: str):
    try:
        if user_id.isdigit():
            remainder_list = remainder_service.get_list_with_user_id(user_id)
            respose_message = jsonify({
                'status': 'OK',
                'remainder_list': remainder_list
            })
            return respose_message, 200
        else:
            raise TypeError(f'user_id must be int type')
    except BaseException as e:
        print(e)
        return str(e), 400

@app.route('/remainder', methods=['POST'])
def add_remainder():
    try:
        json_data = request.json
        print(request)
        print(json_data)
        remainder_form: Remainder = Remainder(json_data['user_id'], json_data['contents'], json_data['tag_id'],
                                              json_data['datetime'],json_data['complete'], 0)
        remainder_form.validateForInsert()
        result_flg, msg = remainder_service.add_remainder(remainder_form)
        if result_flg:
            return msg, 200
        else:
            return msg, 500
    except BaseException as e:
        print('faild remainder insert')
        print(e)
        return str(e), 500

@app.route('/remainder/<remainder_id>', methods=['POST'])
def update_remainder(remainder_id:str):
    try:
        json_data = request.json
        remainder_form: Remainder = Remainder(json_data['user_id'], json_data['contents'], json_data['tag_id'],
                                              json_data['datetime'], json_data['complete'], json_data['id'])
        remainder_form.validateForUpdate()
        remainder_id = int(remainder_id)
        if remainder_id != remainder_form.remainder_id:
            raise Exception('request param is wrong')
        else:
            result_flg, msg = remainder_service.update_remainder(remainder_form)
            return msg, 200
    except BaseException as e:
        print('faild remainder update')
        print(e)
        return str(e), 500

@app.route('/remainder/<remainder_id>', methods=['DELETE'])
def delete(remainder_id: str):
    try:
        remainder_id = int(remainder_id)
        result_flg, msg = remainder_service.delete(remainder_id)
        return msg, 200
    except BaseException as e:
        print('faild remainder delete')
        print(e)
        return str(e), 500


if __name__ == '__main__':
    db.init_app(app)
    app.run(debug=True)