import { RemainderModel } from '~/models/Remainder';
import { RemainderRepository } from '../repositories/RemainderRepository';

const remainderRepository:RemainderRepository = new RemainderRepository()

export async function getAllRemainders(userId: number): Promise<Array<RemainderModel>>{
    return await remainderRepository.selectFromUserId(userId)
}