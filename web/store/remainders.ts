import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { RemainderModel } from '@/models/Remainder'
import { getAll, regist, update, get } from '@/services/RemainderService'
import { RemainderForm } from '../forms/Remainder'

@Module({ name: 'remainder', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
    // state
    remainders: Array<RemainderModel> = []
    selectRemainder: RemainderModel|null = null 
    // mutation
    @Mutation
    public setRemainders(renmainderList: Array<RemainderModel>) {
        this.remainders = new Array<RemainderModel>()
        for (let i:number = 0; i < renmainderList.length; i++) {
            this.remainders.push(renmainderList[i])
        }
    }
    @Mutation
    public setRemainder(remainder: RemainderModel) {
        this.selectRemainder = remainder
    }
    // action
    @Action({rawError:true})
    public async getAll(userId: number) {
        const remainders = await getAll()
        this.setRemainders(remainders)
    }

    @Action({rawError:true})
    public async get(remainderId: number): Promise<void> {
        const data:RemainderModel = await get(remainderId)
        this.setRemainder(data)
        return
    }

    @Action({rawError:true})
    public async regist(remainder: RemainderForm): Promise<Boolean> {
        try {
            return await regist(remainder)
        } catch (e) {
            console.error(e)
            return false
        } 
    }
    @Action({rawError:true})
    public async update(userId: number, contents: string, tagId: number, datetime: Date, complete: boolean, remainderId: number) {
        return await update(userId, contents, tagId, datetime, complete, remainderId)
    }

    // public async delete(remainderId: number) {
    //     return await deleteRemainder(remainderId)
    // }
    // getter
    // get name() {}
}
