import { RemainderModel } from '~/models/Remainder';
import { RemainderRepository } from '../repositories/RemainderRepository';
import { RemainderForm } from '../forms/Remainder'
import { TagForm } from '~/forms/Tag';
import { TagModel } from '~/models/TagModel';

const remainderRepository:RemainderRepository = new RemainderRepository()

export async function getAll(): Promise<Array<RemainderModel>>{
    return await remainderRepository.selectAll()
}

export async function get(remainderId: number): Promise<RemainderModel>{
    const data:RemainderModel = await remainderRepository.selectFromId(remainderId)
    return data
}

export async function regist(remainder : RemainderForm): Promise<Boolean> {
    const newRemainder = new RemainderModel(remainder.contents, remainder.userId, remainder.tag, 
        remainder.datetime, remainder.complete, remainder.id)
    const result = await remainderRepository.insert(newRemainder)
    return result
}

export async function update(userId: number, contents: string, tag: TagModel, datetime: Date, complete: boolean, remianderId: number): Promise<Boolean> {
    const targetRemainder = new RemainderModel(contents, userId, tag, datetime, complete, remianderId)
    const result = await remainderRepository.update(targetRemainder)
    return result
}

export async function deleteRemainder(remainderId: number){
    const result = await remainderRepository.deleteFromRemainderId(remainderId)
    return result
}

export async function changeComplete(userId: number, contents: string, tag: TagModel, datetime: Date, complete: boolean, remianderId: number) {
    const targetRemainder = new RemainderModel(contents, userId, tag, datetime, complete, remianderId)
    const result = await remainderRepository.update(targetRemainder)
    return result
}