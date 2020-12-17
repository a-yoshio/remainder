import { RemainderModel } from '~/models/Remainder';
import { RemainderRepository } from '../repositories/RemainderRepository';
import { RemainderForm } from '../forms/Remainder'

const remainderRepository:RemainderRepository = new RemainderRepository()

export async function getAll(userId: number): Promise<Array<RemainderModel>>{
    return await remainderRepository.selectFromUserId(userId)
}

export async function regist(remainder : RemainderForm): Promise<Boolean> {
    const newRemainder = new RemainderModel(remainder.contents, remainder.userId, remainder.tagId, 
        remainder.datetime, remainder.complete, remainder.id)
    const result = await remainderRepository.insert(newRemainder)
    return result
}

export async function update(userId: number, contents: String, tagId: number, datetime: Date, complete: boolean, remianderId: number): Promise<Boolean> {
    const targetRemainder = new RemainderModel(contents, userId, tagId, datetime, complete, remianderId)
    const result = await remainderRepository.update(targetRemainder)
    return result
}

export async function deleteRemainder(remainderId: number){
    const result = await remainderRepository.deleteFromRemainderId(remainderId)
    return result
}