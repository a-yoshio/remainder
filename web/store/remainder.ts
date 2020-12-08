import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Remainder as RemainderEntity } from '@/entitys/Remainder'
import axios from 'axios';

@Module({ name: 'remainder', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
    // state
    remainders: Array<RemainderEntity> = []
    // mutation
    @Mutation
    public setRemainders(dataList: Array<RemainderEntity>) {
        for (let i:number = 0; i < dataList.length; i++) {
            this.remainders.push(dataList[i])
        }
    }
    // action
    @Action
    public async getAll(userId: number) {
        const response = await axios.get(process.env.apiURL + 'remainder/'+ userId)
        const remainders: Array<RemainderEntity> = response.data.remainder_list
        this.setRemainders(remainders)
    }
    // getter
    // get name() {}
}
