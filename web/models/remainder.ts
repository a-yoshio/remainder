export class RemainderModel {
    id: number;
    contents: string;
    user_id: number;
    tag_id: number;
    datetime: Date;
    complete: boolean;
    constructor(id: number, contents: string, user_id: number, tag_id: number, datetime: Date, complete: boolean) {
        this.id = id;
        this.contents = contents;
        this.user_id = user_id
        this.tag_id = tag_id;
        this.datetime = datetime;
        this.complete = complete;
    }
}