from flask_sqlalchemy import SQLAlchemy

from app.api.api import app

db = SQLAlchemy(app)

def convert_qury_data_to_list(get_list: list):
    refacter_list = []
    for row in get_list:
        refacter_list.append(row.to_dict())
    return refacter_list