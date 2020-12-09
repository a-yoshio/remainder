import { RemainderModel } from '../models/Remainder';
import { BaseRepository } from './BaseRepository';

export class RemainderRepository extends BaseRepository{
    constructor() {
        super('/remainder')
    }

    async selectFromUserId(userId: number): Promise<Array<RemainderModel>> {
        const response = await super.get(userId.toString())
        const remainderData = response.data.remainder_list
        const remaiders: Array<RemainderModel> = []
        for(let i = 0; i < remainderData.length; i++) {
            remaiders.push(this.convertObject(remainderData[i]))
        }
        return remaiders
    }
    private convertObject(obj: any): RemainderModel {
        return new RemainderModel(
            obj.id, 
            obj.contents,
            obj.user_id,
            obj.tag_id,
            obj.datetime,
            obj.complete)
    }
}
