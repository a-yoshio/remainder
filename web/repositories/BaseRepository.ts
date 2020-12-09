import { ReporitoryInterface } from "./RepositoryInterface";
import axios, { AxiosPromise }  from 'axios';

export class BaseRepository implements ReporitoryInterface{
    baseUrl: String;
    url: String;

    constructor(path: String) {
        this.baseUrl = process.env.apiURL as String;
        this.url = this.baseUrl + '' + path;
    }

    private createAccessUrl(path?: String): string {
        let accessUrl = this.url
        if (path != null) {
            accessUrl = accessUrl + '/' + path
        }
        return accessUrl as string
    }

    public async get(path?: String, param?: Map<String, String>): Promise<AxiosPromise<any>> {      
        try {
            const response = await axios.get(this.createAccessUrl(path), {
                params: param
            })
            return response
        } catch(error) {
            throw new Error('[get]server access error: ' + error)
        }
    }
    
    public post(path?: String, param?: Map<String, String>){
        axios.post(this.createAccessUrl(path), {
            params: param
        })
        .then((response) => {

        })
        .catch((error) => {
            throw new Error('[post]server access error: ' + error)
        })
        return true
    }

    public delete(path?: String, param?: Map<String, String>){
        axios.delete(this.createAccessUrl(path), {
            params: param
        })
        .then((response) => {

        })
        .catch((error) => {
            throw new Error('[post]server access error: ' + error)
        })
        return true
    }
    

}