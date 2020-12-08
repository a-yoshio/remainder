import parseISO from 'date-fns/parseISO'
export class Remainder {
    'remainder_id': number 
    'user_id': number
    'contents': String
    'tag_id' : number
    'datetime' : Date
    'complete': boolean
    constructor(remainderId: number, userId: number, contents: String, tagId:number, datetime: any, complete: boolean) {
        try {
            if (typeof datetime == "string") {
                datetime = parseISO(datetime)
            }
            this.datetime = datetime
        } catch(e) {
            console.error('>>>>> datetime parse error!!!!')
        }
        this.remainder_id = remainderId
        this.user_id = userId
        this.contents = contents
        this.tag_id = tagId
        this.complete = complete
    }
}