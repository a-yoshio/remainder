import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import RemaindersModule from '~/store/remainders'
import RemainderModule from '~/store/remainder'
import TagsModule from '~/store/tags'
import TagModule from '~/store/tag'
import AuthModule from '~/store/auth'

let remainderModule: RemainderModule
let remaindersModule: RemaindersModule
let authModule: AuthModule
let tagsModule: TagsModule
let tagModule: TagModule

function initialiseStores(store: Store<any>): void {
    remainderModule = getModule(RemainderModule, store)
    remaindersModule = getModule(RemaindersModule, store)
    authModule = getModule(AuthModule, store)
    tagsModule = getModule(TagsModule, store)
    tagModule = getModule(TagModule, store)
}

export { initialiseStores, remainderModule, remaindersModule, authModule, tagsModule, tagModule}