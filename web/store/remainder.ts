import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { RemainderModel } from '@/models/Remainder'
import { getAllRemainders } from '@/services/RemainderService'

@Module({ name: 'remainder', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
    // state
    remainders: Array<RemainderModel> = []
    // mutation
    @Mutation
    public setRemainders(renmainderList: Array<RemainderModel>) {
        for (let i:number = 0; i < renmainderList.length; i++) {
            this.remainders.push(renmainderList[i])
        }
    }
    // action
    @Action
    public async getAll(userId: number) {
        const remainders = await getAllRemainders(userId)
        this.setRemainders(remainders)
    }
    // getter
    // get name() {}
}
