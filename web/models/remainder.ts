import { BaseModel } from "./BaseModel";
import { format, parse } from "date-fns";

export class RemainderModel extends BaseModel{
    id?: number;
    contents: string;
    user_id: number;
    tag_id: number;
    datetime: Date;
    complete: boolean;
    constructor(contents: string, userId: number, tagId: number, datetime: string|Date, complete: boolean, id?: number) {
        super()
        this.id = id;
        this.contents = contents;
        this.user_id = userId
        this.tag_id = tagId;
        if (typeof datetime == 'string') {
            datetime = new Date(datetime)
        }
        this.datetime = datetime as Date;
        this.complete = complete;
    }

    public formatDateTimeForRequest(): string {
        return format(this.datetime, "yyyyMMddHHmm")
    }
    
    public createJsonParam() {
        return {
            id: this.id,
            contents: this.contents,
            user_id: this.user_id,
            tag_id: this.tag_id,
            datetime: this.formatDateTimeForRequest(),
            complete: this.complete
        }
    }

    public getDate(): string {
        return this.datetime.toISOString().substr(0, 10)
    }

    public getTime(): string {
        return format(this.datetime, 'HH:mm')
    }
}