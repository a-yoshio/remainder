from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseRepository:

    def convert_query_data_to_list(self, get_list: list):
        refacter_list = []
        for row in get_list:
            print(row.to_dict())
            refacter_list.append(row.to_dict())
        return refacter_list

    def add_commit(self, model):
        try:
            db.session.add(model)
            db.session.commit()
        except:
            db.session.rollback()
            raise

