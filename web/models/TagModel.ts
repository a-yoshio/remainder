import { BaseModel } from "./BaseModel";

export class TagModel extends BaseModel{
    id: number;
    title: string;
    color: string;
    constructor(title: string, color: string, id= -1) {
        super()
        this.id = id
        this.title = title
        this.color = color
    }

    public createJsonParam() {
        return {
            id: this.id,
            title: this.title,
            color: this.color
        }
    }
}