import Cookies from 'js-cookie'

import { AuthRepository } from '../repositories/AuthRepository';
import { AuthModel } from '@/models/Auth';

const authRepository:AuthRepository = new AuthRepository()

export async function auth(mailAddress: string, password: string): Promise<Boolean> {
    const model = new AuthModel(mailAddress, password)
    const resData = await authRepository.auth(model)
    if (!resData['access_token'] || !resData['refresh_token']) {
        throw Error('login failed: response is wrong')
    }
    Cookies.set('accessToken', resData['access_token'])
    Cookies.set('refreshToken', resData['refresh_token'])
    return true
}
