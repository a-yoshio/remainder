import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { get, regist, update, deleteTag } from '@/services/TagService'
import { TagForm } from '@/forms/Tag'

@Module({ name: 'tag', namespaced: true, stateFactory: true })
export default class TagModule extends VuexModule {
    // state
    id: number = -1
    title: string = ''
    color: string = ''

    @Mutation
    public setId(id: number) {
        this.id = id
    }

    @Mutation
    public setTitle(title: string) {
        this.title = title
    }

    @Mutation
    public setColor(color: string) {
        this.color = color
    }

    @Action({rawError:true})
    public clear() {
        this.setId(-1)
        this.setTitle('')
        this.setColor('')
    }

    @Action({rawError: true})
    public validate() {
        if (this.title == '' || this.color == '') {
            return false
        } else {
            return true
        }
    }

    @Action({rawError:true})
    public async getTag(tagId: number) {
        const tagModel = await get(tagId)
        this.setTitle(tagModel.title)
        this.setColor(tagModel.color)
        this.setId(tagModel.id)
    }

    @Action({rawError:true})
    public async regist(tag: TagForm) {
        return await regist(tag)
    }

    @Action({rawError:true})
    public async update() {
        return await update(this.title, this.color, this.id)
    }

    @Action({rawError:true})
    public async delete(tagId: number) {
        const result = await deleteTag(tagId)
        this.clear()
        return result
    }
}