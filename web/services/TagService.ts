import { TagModel } from '~/models/TagModel';
import { TagRepository } from '../repositories/TagRepository';
import { TagForm } from '@/forms/Tag';

const tagRepository:TagRepository = new TagRepository()

export async function get(tagId: number): Promise<TagModel> {
    return await tagRepository.selectFromId(tagId)
}

export async function getAll(): Promise<Array<TagModel>>{
    return await tagRepository.selectAll()
}

export async function regist(tag : TagForm): Promise<Boolean> {
    const newTag = new TagModel(tag.title, tag.color)
    const result = await tagRepository.insert(newTag)
    return result
}

export async function update(title: string, color: string, id: number): Promise<Boolean> {
    const tag = new TagModel(title, color, id)
    const result = await tagRepository.update(tag)
    return result
}

export async function deleteTag(tagId: number){
    const result = await tagRepository.deleteTag(tagId)
    return result
}
