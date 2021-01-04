import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { TagModel } from '@/models/TagModel'
import { getAll } from '~/services/TagService'

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
}