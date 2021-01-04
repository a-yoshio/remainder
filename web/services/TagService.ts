import { TagModel } from '~/models/TagModel';
import { TagRepository } from '../repositories/TagRepository';

const tagRepository:TagRepository = new TagRepository()

export async function getAll(): Promise<Array<TagModel>>{
    return await tagRepository.selectAll()
}