export class TagForm {
    id?: number;
    title: string;
    color: string;
    constructor(title: string, color: string, id = -1) {
        this.id = id;
        this.title = title
        this.color = color
    }
}