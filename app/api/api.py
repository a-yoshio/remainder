from flask import (Flask, jsonify, request)
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt

import app.service.remainder_service as remainder_service
import app.service.tag_service as tag_service
import app.service.auth_service as auth_service
from app.config.application_config import configure_app
from app.form.remainder import Remainder
from app.form.tag import Tag
from app.form.auth import Auth

app = Flask(__name__, instance_relative_config='')
configure_app(app)
# cors = CORS(app, resource={"/auth*": {"origins": "http://localhost:3000"}}) # resourceを設定することで、APIアクセスができる元を制限
cors = CORS(app)
db = SQLAlchemy()
bcrypt = Bcrypt(app)

@app.route('/hello')
def hello():
    return 'Hello takoyaki'

@app.route('/auth')
def auth():
    try:
        auth_form = Auth(request.args.get('mas'), request.args.get('pwd'))
        auth_form.validation()
        auth_service.auth(auth_form)
        respose_message = jsonify({
            'status': 'OK',
        })
        return respose_message, 200
    except BaseException as e:
        print(e)
        return str(e), 400


@app.route('/remainder', methods=['GET'])
def get_remainder_list():
    try:
        # TODO: use applied userId
        user_id = '1'
        if user_id.isdigit():
            intId = int(user_id)
            remainder_list = remainder_service.get_with_user_id(intId)
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

@app.route('/remainder/<remainder_id>', methods=['GET'])
def get_remainder(remainder_id: str):
    try:
        if remainder_id.isdigit():
            intId = int(remainder_id)
            remainder = remainder_service.get(intId)
            respose_message = jsonify({
                'status': 'OK',
                'remainder': remainder
            })
            return respose_message, 200
        else:
            raise TypeError(f'remainder_id must be int type')
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
def delete_remainder(remainder_id: str):
    try:
        remainder_id = int(remainder_id)
        result_flg, msg = remainder_service.delete(remainder_id)
        return msg, 200
    except BaseException as e:
        print('faild remainder delete')
        print(e)
        return str(e), 500

# Tag
@app.route('/remainder/tag', methods=['GET'])
def get_tag_list():
    try:
        # TODO: use applied userId
        user_id = '1'
        if user_id.isdigit():
            intId = int(user_id)
            tag_list = tag_service.get_with_user_id(intId)
            respose_message = jsonify({
                'status': 'OK',
                'tag_list': tag_list
            })
            return respose_message, 200
        else:
            raise TypeError(f'user_id must be int type')
    except BaseException as e:
        print(e)
        return str(e), 400


@app.route('/remainder/tag/<tag_id>', methods=['GET'])
def get_tag(tag_id: str):
    try:
        if tag_id.isdigit():
            intId = int(tag_id)
            remainder = tag_service.get(intId)
            respose_message = jsonify({
                'status': 'OK',
                'tag': remainder
            })
            return respose_message, 200
        else:
            raise TypeError(f'tag_id must be int type')
    except BaseException as e:
        print(e)
        return str(e), 400


@app.route('/remainder/tag', methods=['POST'])
def add_tag():
    try:
        json_data = request.json
        print(json_data)
        tag_form: Tag = Tag(json_data['title'], json_data['colors'], json_data['user_id'])
        tag_form.validateForInsert()
        result_flg, msg = tag_service.add_tag(tag_form)
        if result_flg:
            return msg, 200
        else:
            return msg, 500
    except BaseException as e:
        print('faild tag insert')
        print(e)
        return str(e), 500

@app.route('/remainder/tag/<tag_id>', methods=['POST'])
def update_tag(tag_id:str):
    try:
        json_data = request.json
        tag_form: Tag = Tag(json_data['title'], json_data['colors'], json_data['user_id'],json_data['id'])
        tag_form.validateForUpdate()
        tag_id = int(tag_id)
        if tag_id != tag_form.id:
            raise Exception('request param is wrong')
        else:
            result_flg, msg = tag_service.update_tag(tag_form)
            return msg, 200
    except BaseException as e:
        print('faild tag update')
        print(e)
        return str(e), 500

@app.route('/remainder/tag/<tag_id>', methods=['DELETE'])
def delete_tag(tag_id: str):
    try:
        tag_id = int(tag_id)
        result_flg, msg = tag_service.delete(tag_id)
        return msg, 200
    except BaseException as e:
        print('faild tag delete')
        print(e)
        return str(e), 500

if __name__ == '__main__':
    db.init_app(app)
    app.run(debug=True)