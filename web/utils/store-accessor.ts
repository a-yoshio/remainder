import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import RemaindersModule from '~/store/remainders'
import RemainderModule from '~/store/remainder'

let remainderModule: RemainderModule
let remaindersModule: RemaindersModule

function initialiseStores(store: Store<any>): void {
    remainderModule = getModule(RemainderModule, store)
    remaindersModule = getModule(RemaindersModule, store)
}

export { initialiseStores, remainderModule, remaindersModule}