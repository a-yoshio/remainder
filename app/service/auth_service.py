from app.api.api import bcrypt
from app.form.auth import Auth as AuthForm
from app.repository.user_repository import UserRepository

userRepository = UserRepository()

def auth(form: AuthForm):
    print('auth start')
    user_dict = userRepository.get(form.mail_address)
    if bcrypt.check_password_hash(user_dict['password'], form.password.encode('utf-8')):
        print('auth success')
        userRepository.update_login_date(user_dict['id'])
        return True
    else:
        raise Exception('login false')


