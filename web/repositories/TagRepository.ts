import { BaseRepository } from './BaseRepository';
import { TagModel } from '@/models/TagModel'

export class TagRepository extends BaseRepository{
    constructor() {
        super('/remainder/tag')
    }

    async selectFromId(tagId: number): Promise<TagModel> {
        const response = await super.get(undefined, tagId.toString())
        const objRemainder = response.data.tag
        const tag = this.convertObject(objRemainder)
        return tag
    }

    async selectAll(): Promise<Array<TagModel>> {
        const response = await super.get()
        const tagData = response.data.tag_list
        const tags: Array<TagModel> = []
        for(let i = 0; i < tagData.length; i++) {
            const tag = this.convertObject(tagData[i])
            tags.push(tag)
        }
        return tags
    }

    async insert(tag: TagModel): Promise<Boolean> {
        const jsonData = tag.createJsonParam()
        await super.post(jsonData, undefined)
        return true
    }

    private convertObject(obj: any): TagModel {
        return new TagModel(
            obj.title,
            obj.color,
            obj.id
        )
    }

    async update(tag:　TagModel): Promise<Boolean> {
        let tagMap = tag.createJsonParam()
        if (tag.id == -1) {
            throw Error('[update]Invalide tag id')
        } else {
            await super.post(tagMap, tag.id.toString())
            return true
        }
    }

    async deleteTag(tagId: number): Promise<Boolean> {
        return await super.delete(tagId.toString())
    }
}