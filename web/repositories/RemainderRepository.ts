import axios  from 'axios';
import { Remainder } from '../models/remainder';

export class RemainderRepository {
    path: string;
    constructor() {
        this.path = '/remainder';
    }

    async get_all(user_id: number) {
        try {
            const url = this.path + '/' + user_id.toString();
            const result = await axios.get(url)
            return result.data.remainder_list.map((remainder_obj: object) => this.convert_object(remainder_obj))
        } catch (error) {
            console.error(error);
        }
    }
    private convert_object(obj: any) {
        return new Remainder(obj.id, 
            obj.contents,
            obj.user_id,
            obj.tag_id,
            obj.datetime,
            obj.complete)
    }
}
