export class RemainderForm {
    id: number;
    contents: string;
    userId: number;
    tagId: number;
    datetime: Date;
    complete: boolean;
    constructor(contents: string, userId: number, tagId: number, datetime: Date, complete: boolean, id: number=-1) {
        this.id = id;
        this.contents = contents;
        this.userId = userId
        this.tagId = tagId;
        this.datetime = datetime;
        this.complete = complete;
    }
}