def convert_query_data_to_list(get_list: list):
    refacter_list = []
    for row in get_list:
        print(row.to_dict())
        refacter_list.append(row.to_dict())
    return refacter_list

def check_user(models_id: int, auth_id: int, tag = 'edit this module'):
    if models_id != auth_id:
        raise PermissionError('You cannnot {0}'.format(tag))
