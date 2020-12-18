import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { RemainderModel } from '@/models/Remainder'
import { getAll, regist, update, get } from '@/services/RemainderService'
import { RemainderForm } from '../forms/Remainder'

@Module({ name: 'remainders', namespaced: true, stateFactory: true })
export default class RemaindersModule extends VuexModule {
    // state
    remainders: Array<RemainderModel> = []
    // mutation
    @Mutation
    public setRemainders(renmainderList: Array<RemainderModel>) {
        this.remainders = new Array<RemainderModel>()
        for (let i:number = 0; i < renmainderList.length; i++) {
            this.remainders.push(renmainderList[i])
        }
    }
    // action
    @Action({rawError:true})
    public async getAll() {
        const remainders = await getAll()
        this.setRemainders(remainders)
    }
}
