import axios, { AxiosPromise }  from 'axios';

export class BaseRepository {
    url: String;

    constructor(path: String) {
        this.url = process.env.apiURL + '' + path;
    }

    private createAccessUrl(path?: String): string {
        let accessUrl = this.url
        if (path != null) {
            accessUrl = accessUrl + '/' + path
        }
        console.log('>>>>' + accessUrl)
        return accessUrl as string
    }

    public async get(param?: Map<String, any>, path?: String): Promise<AxiosPromise<any>> {      
        try {
            const response = await axios.get(this.createAccessUrl(path), {
                params: param
            })
            return response
        } catch(error) {
            throw new Error('[get]server access error: ' + error)
        }
    }
    
    public async post(param?: any, path?: String): Promise<Boolean>{
        try {
            await axios.post(this.createAccessUrl(path), param)
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