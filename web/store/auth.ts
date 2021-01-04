import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { login, checkToken } from '@/services/AuthService';

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class AuthModule extends VuexModule {
    // state
    login_state : Boolean = false
    access_token: string = ''
    refresh_token: string = ''
    // mutation
    @Mutation
    public setLoginState(state: Boolean) {
        this.login_state = state
    }
    // action
    @Action({rawError:true})
    public async login(authData:{ mailAddress:string, password: string }): Promise<Boolean> {
        this.setLoginState(false)
        const result:Boolean = await login(authData.mailAddress, authData.password)
        this.setLoginState(result)
        return result
    }

    @Action({rawError:true})
    public async tokenCheck(pageRequest:any): Promise<Boolean> {
        try{
            this.setLoginState(false)
            const result: Boolean = await checkToken(pageRequest)
            this.setLoginState(result)
            return result
        } catch(err) {
            console.error(err)
            this.setLoginState(false)
            return false
        }
    }
}
