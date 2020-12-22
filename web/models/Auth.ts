import { BaseModel } from "./BaseModel";
import { HMAC } from "fast-sha256";

export class AuthModel extends BaseModel{
    mail_address: string;
    password: Uint8Array;
    constructor(mail_address: string, password: string) {
        super()
        this.mail_address = mail_address

        const convertPass = this.convertStringToUint8Array(password)
        const key = this.convertStringToUint8Array('oritool')
        // this.password = sha256.hash(convertPass)
        const h = new HMAC(key)
        this.password = h.update(convertPass).digest()
    }

    private convertStringToUint8Array(password: string): Uint8Array {
        var result = [];
        for(var i = 0; i < password.length; i+=2)
        {
            result.push(parseInt(password.substring(i, i + 2), 16));
        }
        return Uint8Array.from(result)
    }
}