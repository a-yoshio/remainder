import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { TagModel } from '@/models/TagModel'
import { getAll, regist } from '~/services/TagService'
import { TagForm } from '~/forms/Tag'

@Module({ name: 'tags', namespaced: true, stateFactory: true })
export default class TagsModule extends VuexModule {
    // state
    tags: Array<TagModel> = []
    // mutation
    @Mutation
    public setTags(tagList: Array<TagModel>) {
        this.tags = new Array<TagModel>()
        for (let i:number = 0; i < tagList.length; i++) {
            this.tags.push(tagList[i])
        }
    }

    @Action({rawError:true})
    public async getAll() {
        const tags = await getAll()
        this.setTags(tags)
    }

    @Action({rawError:true})
    public async regist(tag: TagForm) {
        return await regist(tag)
    }
}