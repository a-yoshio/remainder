import { Store } from 'vuex'
import { initialiseStores } from '@/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '@/utils/store-accessor'

export const actions = {
    /**
     * サーバー初期化時の処理
     */
    async nuxtServerInit(context: { dispatch: any, commit:any, state:any }, param:{ req:any, res:any, error:any }): Promise<void> {
        await context.dispatch('auth/tokenCheck', param.req)
        return
    },
    /**
    * クライアント初期化時の処理
    */
    async nuxtClientInit(context: { dispatch:any }): Promise<void> {
        await context.dispatch('auth/tokenCheck')        
    }
}
