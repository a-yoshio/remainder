export class Result { //読み込めないけん！
    'status': boolean
    'cause': String
    constructor(status: boolean, cause: String) {
        this.status = status
        this.cause = cause
    }
}