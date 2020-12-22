import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { auth } from '@/services/AuthService';

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
    // action
    @Action({rawError:true})
    public async auth(authData:{ mailAddress:string, password: string }): Promise<Boolean> {
        return await auth(authData.mailAddress, authData.password)
    }
}
