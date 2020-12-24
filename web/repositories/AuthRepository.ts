import { BaseRepository } from './BaseRepository';
import { AuthModel } from '@/models/Auth';

export class AuthRepository extends BaseRepository{
    constructor() {
        super('/auth')
    }

    async auth(authModel: AuthModel): Promise<any> {
        const param = authModel.createJsonParam()
        const response = await super.post(param, undefined)
        return response.data
    }

    async refresh(): Promise<any> {
        const response = await super.get(undefined, '/refresh')
        return response.data
    }
}