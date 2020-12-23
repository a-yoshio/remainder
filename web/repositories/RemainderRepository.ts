import { remaindersModule } from '~/store';
import { RemainderModel } from '../models/Remainder';
import { BaseRepository } from './BaseRepository';

export class RemainderRepository extends BaseRepository{
    constructor() {
        super('/remainder')
    }

    async selectAll(): Promise<Array<RemainderModel>> {
        const response = await super.get()
        const remainderData = response.data.remainder_list
        const remainders: Array<RemainderModel> = []
        for(let i = 0; i < remainderData.length; i++) {
            const remainder= this.convertObject(remainderData[i])
            remainders.push(remainder)
        }
        return remainders
    }

    async selectFromId(remainderId: number): Promise<RemainderModel> {
        const response = await super.get(undefined, remainderId.toString())
        const objRemainder = response.data.remainder
        const remainder = this.convertObject(objRemainder)
        return remainder
    }

    async insert(remainder: RemainderModel): Promise<Boolean> {
        const jsonData = remainder.createJsonParam()
        await super.post(jsonData, undefined)
        return true
    }

    async update(remainder: RemainderModel): Promise<Boolean> {
        let remainderMap = remainder.createJsonParam()
        if (!remainder.id) {
            throw Error('[update]Invalide remainder id')
        } else {
            await super.post(remainderMap, remainder.id.toString())
            return true
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
