import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Remainder as RemainderEntity } from '@/entitys/Remainder'

@Module({ name: 'remainder', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
    // state
    remainders: Array<RemainderEntity> = []
    // mutation
    @Mutation
    public fetchAll() {
        const test = new RemainderEntity(1, 1, '味噌汁を飲む', 2, new Date(2020, 11, 12, 10, 20, 22), false)
        this.remainders.push(test)
        console.log(this.remainders)
    }
    // getter
    // get name() {}
}
