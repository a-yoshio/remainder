import axios, { AxiosPromise }  from 'axios';
import Cookies from 'js-cookie'

export class BaseRepository {
    url: string;

    constructor(path: string) {
        this.url = process.env.apiURL + '' + path;
    }

    private createHeader() {
        const access_token = Cookies.get('act')
        const refresh_token = Cookies.get('rft')
        if (access_token || refresh_token) {
            let setToken = refresh_token
            if (access_token) {
                setToken = access_token
            }
            return {
                headers: {
                    'Authorization': 'Bearer ' + setToken
                } 
            }
        } else {
            return {}
        }
    }

    private createAccessUrl(path?: string): string {
        let accessUrl = this.url
        if (path != null) {
            accessUrl = accessUrl + '/' + path
        }
        return accessUrl as string
    }

    public async get(param?: Map<string, string>, path?: string): Promise<AxiosPromise<any>> {      
        try {
            let paramStr = ''
            if (param) {
                paramStr = '?'
                param.forEach((value, key) => {
                    paramStr = paramStr + key + '=' + value + '&'
                })
                paramStr = paramStr.slice(0, -1)
            }
            const headers = this.createHeader()
            const response = await axios.get(this.createAccessUrl(path) + paramStr, headers)
            return response
        } catch(error) {
            throw new Error('[get]server access error: ' + error)
        }
    }
    
    public async post(param?: any, path?: string): Promise<any>{
        try {
                return await axios.post(this.createAccessUrl(path), param, this.createHeader())
        } catch(error) {
            throw new Error('[post]server access error: ' + error)
        }
    }

    public async delete(path: string): Promise<Boolean>{
        try {
            await axios.delete(this.createAccessUrl(path), this.createHeader())
            return true
        } catch (error) {
            throw new Error('[post]server access error: ' + error)
        }
    }
}