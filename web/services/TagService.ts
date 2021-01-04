import { TagModel } from '~/models/TagModel';
import { TagRepository } from '../repositories/TagRepository';
import { TagForm } from '@/forms/Tag';

const tagRepository:TagRepository = new TagRepository()

export async function getAll(): Promise<Array<TagModel>>{
    return await tagRepository.selectAll()
}

export async function regist(tag : TagForm): Promise<Boolean> {
    const newTag = new TagModel(tag.title, tag.color)
    const result = await tagRepository.insert(newTag)
    return result
}
