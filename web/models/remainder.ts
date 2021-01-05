import { BaseModel } from "./BaseModel";
import { format } from "date-fns";

export class RemainderModel extends BaseModel{
    id: number;
    contents: string;
    user_id: number;
    tag_id: number;
    datetime: Date;
    complete: boolean;
    disp_datetime: string;
    constructor(contents: string, userId: number, tagId: number, datetime: string|Date, complete: boolean, id: number = -1) {
        super()
        this.id = id;
        this.contents = contents;
        this.user_id = userId
        this.tag_id = tagId;
        if (typeof datetime == 'string') {
            datetime = datetime + ' +0900'
            datetime = new Date(datetime)
        }
        this.datetime = datetime as Date;
        this.complete = complete;
        this.disp_datetime = this.formatDateTimeForDisplay()
    }

    public formatDateTimeForRequest(): string {
        return format(this.datetime, "yyyyMMddHHmm")
    }

    public formatDateTimeForDisplay(): string {
        return format(this.datetime, "yyyy年MM月dd日 HH:mm")
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