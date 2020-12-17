export class RemainderForm {
    id?: number;
    contents: String;
    userId: number;
    tagId: number;
    datetime: Date;
    complete: boolean;
    constructor(contents: String, userId: number, tagId: number, datetime: Date, complete: boolean, id: number) {
        this.id = id;
        this.contents = contents;
        this.userId = userId
        this.tagId = tagId;
        this.datetime = datetime;
        this.complete = complete;
    }
}