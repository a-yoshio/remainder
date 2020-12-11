import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators'
import { RemainderModel } from '@/models/Remainder'
import { getAll, regist, update } from '@/services/RemainderService'
config.rawError = true

@Module({ name: 'remainder', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
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
    @Action
    public async getAll(userId: number) {
        const remainders = await getAll(userId)
        this.setRemainders(remainders)
    }
    public async regist(user_id: number, contents: String, tag_id: number, datetime: Date): Promise<Boolean> {
        return await regist(user_id, contents, tag_id, datetime)
    }

    public async update(userId: number, contents: String, tagId: number, datetime: Date, complete: boolean, remainderId: number) {
        return await update(userId, contents, tagId, datetime, complete, remainderId)
    }

    // public async delete(remainderId: number) {
    //     return await deleteRemainder(remainderId)
    // }
    // getter
    // get name() {}
}
