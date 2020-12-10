import { BaseModel } from "./BaseModel";

export class RemainderModel extends BaseModel{
    id?: number;
    contents: String;
    user_id: number;
    tag_id: number;
    datetime: Date;
    complete: boolean;
    constructor(contents: String, user_id: number, tag_id: number, datetime: Date, complete: boolean, id?: number) {
        super()
        this.id = id;
        this.contents = contents;
        this.user_id = user_id
        this.tag_id = tag_id;
        this.datetime = datetime;
        this.complete = complete;
    }
}