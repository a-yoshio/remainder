from app.api.api import (db)

def convert_qury_data_to_list(get_list: list):
    refacter_list = []
    for row in get_list:
        print(row.to_dict())
        refacter_list.append(row.to_dict())
    return refacter_list

def add_commit(model:db.Model):
    try:
        db.session.add(model)
        db.session.commit()
    except:
        db.session.rollback()
        raise
