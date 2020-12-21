def convert_query_data_to_list(get_list: list):
    refacter_list = []
    for row in get_list:
        print(row.to_dict())
        refacter_list.append(row.to_dict())
    return refacter_list