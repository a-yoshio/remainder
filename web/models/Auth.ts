import { BaseModel } from "./BaseModel";

export class AuthModel extends BaseModel{
    mail_address: string;
    password: Uint8Array|string;
    constructor(mail_address: string, password: string) {
        super()
        this.mail_address = mail_address
        this.password = password
    }

    private convertStringToUint8Array(password: string): Uint8Array {
        var result = [];
        for(var i = 0; i < password.length; i+=2)
        {
            result.push(parseInt(password.substring(i, i + 2), 16));
        }
        return Uint8Array.from(result)
    }

    public createJsonParam() {
        return {
            mail_address: this.mail_address,
            password: this.password
        }
    }
}