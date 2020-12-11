import axios, { AxiosPromise }  from 'axios';

export class BaseRepository {
    baseUrl: String;
    url: String;

    constructor(path: String) {
        this.baseUrl = '/api';
        this.url = this.baseUrl + '' + path;
    }

    private createAccessUrl(path?: String): string {
        let accessUrl = this.url
        if (path != null) {
            accessUrl = accessUrl + '/' + path
        }
        return accessUrl as string
    }

    public async get(param?: Map<String, String>, path?: String): Promise<AxiosPromise<any>> {      
        try {
            const response = await axios.get(this.createAccessUrl(path), {
                params: param
            })
            return response
        } catch(error) {
            throw new Error('[get]server access error: ' + error)
        }
    }
    
    public async post(param?: Map<String, String>, path?: String): Promise<Boolean>{
        try {
            await axios.post(this.createAccessUrl(path), {
                params: param
            })
            return true
        } catch(error) {
            throw new Error('[post]server access error: ' + error)
        }
    }

    public async delete(path: String): Promise<Boolean>{
        try {
            await axios.delete(this.createAccessUrl(path))
            return true
        } catch (error) {
            throw new Error('[post]server access error: ' + error)
        }
    }
}