import { AuthRepository } from '../repositories/AuthRepository';
import { AuthModel } from '@/models/Auth';

const authRepository:AuthRepository = new AuthRepository()

export async function auth(mailAddress: string, password: string): Promise<Boolean> {
    const model = new AuthModel(mailAddress, password)
    return await authRepository.auth(model)
}
