from datetime import datetime as dt

def None_check(key, value):
    if value is None or value == '':
        print(f'{key} is empty.')
        value = None
    return value

def str_check(key, value):
    if type(value) != str:
        raise TypeError(f'{key} must be str type')
    return value


def int_check(key, value):
    if type(value) != int:
        raise TypeError(f'{key} must be int type')
    return value


def bool_check(key, value):
    if type(value) != bool:
        raise TypeError(f'{key} must be bool type')
    return value


def datetime_check(key, value):
    try:
        value = dt.strptime(value, '%Y%m%d%H%M')
        return value
    except ValueError as e:
        raise ValueError(f'{key} must be datetime format like %Y%m%d%H%M')