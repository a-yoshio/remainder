from flask import jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token)

from app.api.api import bcrypt
from app.repository.user_repository import UserRepository



userRepository = UserRepository()

def auth(mail_address:str, password:str):
    print('auth start')
    user_model = userRepository.get_with_mail(mail_address)
    print(bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8'))
    if bcrypt.check_password_hash(user_model.password, password.encode('utf-8')):
        print('auth success')
        userRepository.update_login_date(user_model.id)
        token = create_access_token(user_model.id)
        refresh_token = create_refresh_token(user_model.id)
        return jsonify(access_token=token, refresh_token=refresh_token)
    else:
        raise Exception('login false')

def identity(payload):
    user_id = payload['id']
    return userRepository.get(user_id)
