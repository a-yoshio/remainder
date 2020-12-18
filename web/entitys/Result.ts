export class Result {
    'status': boolean
    'cause': string
    constructor(status: boolean, cause: string) {
        this.status = status
        this.cause = cause
    }
}