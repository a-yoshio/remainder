import {AxiosPromise} from 'axios';

export interface ReporitoryInterface {
    url: String;
    get(path?:String, param?: Map<String, String>): Promise<AxiosPromise<any>>;
    post(path?:String, param?: Map<String, String>): Boolean;
    delete(path?:String, param?: Map<String, String>): boolean;
}