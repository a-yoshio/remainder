import { BaseRepository } from './BaseRepository';
import { AuthModel } from '@/models/Auth';

export class AuthRepository extends BaseRepository{
    constructor() {
        super('/auth')
    }

    async auth(authModel: AuthModel): Promise<Boolean> {
        const param = new Map<string, any> ([
            ['mas', authModel.mail_address],
            ['pwd', authModel.password],
        ])
        const response = await super.get(param)
        console.log('>>>>>resonse: ' + response)
        return response.data.result
    }
}