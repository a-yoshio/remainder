import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import RemaindersModule from '~/store/remainders'
import RemainderModule from '~/store/remainder'
import AuthModule from '~/store/auth'

let remainderModule: RemainderModule
let remaindersModule: RemaindersModule
let authModule: AuthModule

function initialiseStores(store: Store<any>): void {
    remainderModule = getModule(RemainderModule, store)
    remaindersModule = getModule(RemaindersModule, store)
    authModule = getModule(AuthModule, store)
}

export { initialiseStores, remainderModule, remaindersModule, authModule}