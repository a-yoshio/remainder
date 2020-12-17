import { BaseModel } from "./BaseModel";
import { format } from "date-fns";

export class RemainderModel extends BaseModel{
    id?: number;
    contents: String;
    user_id: number;
    tag_id: number;
    datetime: Date;
    complete: boolean;
    constructor(contents: String, userId: number, tagId: number, datetime: Date, complete: boolean, id?: number) {
        super()
        this.id = id;
        this.contents = contents;
        this.user_id = userId
        this.tag_id = tagId;
        this.datetime = datetime;
        this.complete = complete;
    }

    parseDatetimeForRequest() {
        return format(this.datetime, "yyyyMMddHHmm")
    }

    createJsonParam() {
        return {
            id: this.id,
            contents: this.contents,
            user_id: this.user_id,
            tag_id: this.tag_id,
            datetime: this.parseDatetimeForRequest(),
            complete: this.complete
        }
    }
}