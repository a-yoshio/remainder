import Cookies from 'js-cookie'

import { AuthRepository } from '../repositories/AuthRepository';
import { AuthModel } from '@/models/Auth';

const authRepository:AuthRepository = new AuthRepository()

export async function login(mailAddress: string, password: string): Promise<Boolean> {
    const model = new AuthModel(mailAddress, password)
    const resData = await authRepository.auth(model)
    if (!resData['access_token'] || !resData['refresh_token']) {
        throw Error('login failed: response is wrong')
    }
    Cookies.set('act', resData['access_token'], { expires: 2, path: '/' })
    Cookies.set('rft', resData['refresh_token'], { expires: 30, path: '/' })
    return true
}

export async function checkToken(request: any): Promise<Boolean> {
    if (!request.headers.cookie) {
        return false
    }
    const cookieMap = convertCookieToMap(request.headers.cookie)
    if (!cookieMap.has('rft')) {
        return false
    } else if (!cookieMap.has('act')) {
        Cookies.set('rft', cookieMap.get('rft') as string)
        const data = await authRepository.refresh()
        return true
    }        
 else {
        return true
    }
    
}

export function convertCookieToMap(cookie: string): Map<string, string> {
    let cookieMap = new Map<string, string>()
    cookie = cookie.replace(' ', '')
    for (const num in cookie.split(';')) {
        const row = cookie.split(';')[num]
        const key = row.split('=')[0]
        const value = row.split('=')[1]
        cookieMap.set(key, value)
    }
    return cookieMap
}
