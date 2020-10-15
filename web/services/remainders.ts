import { RemainderRepository } from '../repositories/RemainderRepository';

const remainder_repository = new RemainderRepository()

export async function get_all(user_id: number){
    if(typeof user_id != 'number') {
        throw Error('user_id must be number');
    }
    const remainder_list = await remainder_repository.get_all(user_id)
    return remainder_list
}