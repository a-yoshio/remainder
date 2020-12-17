import { RemainderModel } from '../models/Remainder';
import { BaseRepository } from './BaseRepository';

export class RemainderRepository extends BaseRepository{
    constructor() {
        super('/remainder')
    }

    async selectFromUserId(userId: number): Promise<Array<RemainderModel>> {
        const response = await super.get(undefined, userId.toString())
        const remainderData = response.data.remainder_list
        const remaiders: Array<RemainderModel> = []
        for(let i = 0; i < remainderData.length; i++) {
            remaiders.push(this.convertObject(remainderData[i]))
        }
        return remaiders
    }

    async insert(remainder: RemainderModel): Promise<Boolean> {
        const jsonData = remainder.createJsonParam()
        console.log(jsonData)
        return await super.post(jsonData, undefined)
    }

    async update(remainder: RemainderModel): Promise<Boolean> {
        let remaidner: Map<String, any> = remainder.convertMap()
        if (!remainder.id) {
            throw Error('[update]Invalide remainder id')
        } else {
            return await super.post(remaidner, remainder.id.toString())
        }
    }

    async deleteFromRemainderId(remainderId: number): Promise<Boolean> {
        return await super.delete(remainderId.toString())
    }

    private convertObject(obj: any): RemainderModel {
        return new RemainderModel(
            obj.contents,
            obj.user_id,
            obj.tag_id,
            obj.datetime,
            obj.complete,
            obj.id
        )
    }
}
