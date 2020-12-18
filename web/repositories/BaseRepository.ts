import axios, { AxiosPromise }  from 'axios';

export class BaseRepository {
    url: string;

    constructor(path: string) {
        this.url = process.env.apiURL + '' + path;
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
            const response = await axios.get(this.createAccessUrl(path) + paramStr)
            return response
        } catch(error) {
            throw new Error('[get]server access error: ' + error)
        }
    }
    
    public async post(param?: any, path?: string): Promise<Boolean>{
        try {
            await axios.post(this.createAccessUrl(path), param)
            return true
        } catch(error) {
            throw new Error('[post]server access error: ' + error)
        }
    }

    public async delete(path: string): Promise<Boolean>{
        try {
            await axios.delete(this.createAccessUrl(path))
            return true
        } catch (error) {
            throw new Error('[post]server access error: ' + error)
        }
    }
}