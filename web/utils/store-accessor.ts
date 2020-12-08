import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import RemainderModule from '~/store/remainder'

let remainderModule: RemainderModule


function initialiseStores(store: Store<any>): void {
    remainderModule = getModule(RemainderModule, store)
}

export { initialiseStores, remainderModule }