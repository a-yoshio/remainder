import { TagModel } from "@/models/TagModel";

export class RemainderForm {
    id: number;
    contents: string;
    userId: number;
    tag: TagModel;
    datetime: Date;
    complete: boolean;
    constructor(contents: string, tag: TagModel, datetime: Date, complete: boolean, id: number=-1, userId: number =-1) {
        this.id = id;
        this.contents = contents;
        this.userId = userId
        this.tag = tag;
        this.datetime = datetime;
        this.complete = complete;
    }
}