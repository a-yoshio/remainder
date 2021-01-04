import { BaseRepository } from './BaseRepository';
import { TagModel } from '@/models/TagModel'

export class TagRepository extends BaseRepository{
    constructor() {
        super('/remainder/tag')
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

    private convertObject(obj: any): TagModel {
        return new TagModel(
            obj.title,
            obj.color,
            obj.id
        )
    }
}