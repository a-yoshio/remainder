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
    Cookies.set('act', resData['access_token'], { expires: 200000, path: '/' })
    Cookies.set('rft', resData['refresh_token'], { expires: 200000, path: '/' })
    return true
}

export async function checkToken(request?: any): Promise<Boolean> {
    // Cookieの中をチェック
    if (Cookies.get('act')) {
        return true
    } else if (Cookies.get('rft')) {
        await authRepository.refresh()
        return true
    } else if (!request) {// Cookieの中に何もなかったら、httpリクエストをチェック
        return false
    } else if (!request.headers.cookie) { // httpリクエストのcookieをチェック
        return false
    } 
    // httpリクエストのcookieの中身を分解して、必要なものを取得
    const cookieMap = convertCookieToMap(request.headers.cookie)
    if (!cookieMap.has('rft')) {
        return false
    } else if (!cookieMap.has('act')) {
        Cookies.set('rft', cookieMap.get('rft') as string)
        await authRepository.refresh()
        return true
    }
    return false
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
