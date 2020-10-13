from flask import (Flask, jsonify, request)
from flask_sqlalchemy import SQLAlchemy

import app.service.remainder_service as remainder_service
from app.config.application_config import configure_app
from app.form.remainder import (Remainder)

app = Flask(__name__, instance_relative_config='')
configure_app(app)
db = SQLAlchemy(app)

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
        result_flg, msg = remainder_service.add_remainder(Remainder(json_data))
        if result_flg:
            return msg, 200
        else:
            return msg, 400
    except BaseException as e:
        print(e)
        return str(e), 400


if __name__ == '__main__':
    app.run(debug=True)