import fetch from 'node-fetch';

type body = string | ArrayBuffer | ArrayBufferView | NodeJS.ReadableStream | URLSearchParams | FormData | undefined;
export type headersType = {
    'Content-Type'?: string;
    Authorization?: string;
};
export const contentTypes = {
    urlencoded: 'application/x-www-form-urlencoded',
    json: 'application/json'
};
type bodyType = 'JSON' | 'FORM-DATA';

export class ApiClient implements IApiClient {
    private static instance: ApiClient;
    private _baseUrl: string;
    private bodyType: bodyType = 'JSON';
    headers: headersType = {};
    private constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }
    public static getInstance(baseUrl: string): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient(baseUrl);
        }
        return ApiClient.instance;
    }
    public setBodyType(bodyType: bodyType) {
        this.bodyType = bodyType;
    }
    private setAuthorization() {
        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken && !this.headers.Authorization) this.headers.Authorization = 'Bearer ' + sessionToken;
    }
    get baseUrl() {
        return this._baseUrl;
    }
    async get(url: string, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'GET' }, resBuffer);
    }

    async post(url: string, body?: body, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'POST', body }, resBuffer);
    }

    async put(url: string, body?: body, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'PUT', body }, resBuffer);
    }

    async delete(url: string, body?: body, resBuffer?: boolean) {
        return await this.callRequest(url, { method: 'DELETE', body }, resBuffer);
    }
    async callRequest(url: string, options?: any, resBuffer?: boolean) {
        this.setAuthorization();
        const headers = { ...this.headers };
        if (this.bodyType === 'JSON') headers['Content-Type'] = contentTypes.json;
        const requestOptions = { ...options, headers };
        const response = await fetch(this.mergeUrl(url), requestOptions);
        this.bodyType = 'JSON';
        if (!response.ok) {
            const message = await response.text();
            console.log(message);
            return;
        }
        let res: any = 'SUCCESS';
        try {
            res = await response.json();
            console.log(res);
            if (!res?.success) {
                throw new Error(`${url}, error`);
            }
        } catch (e) {
            //error json
            console.log(e);
        }
        return res;
    }

    //utils

    mergeUrl(url: string) {
        return this._baseUrl + url;
    }
}

export interface IApiClient {
    baseUrl: string;
    headers: headersType;
    get: (url: string, resBuffer?: boolean) => Promise<any>;
    post: (url: string, body?: body, resBuffer?: boolean) => Promise<any>;
    put: (url: string, body?: body, resBuffer?: boolean) => Promise<any>;
    delete: (url: string, body?: body, resBuffer?: boolean) => Promise<any>;
    setBodyType: (bodyType: bodyType) => void;
    callRequest(url: string, options?: any): Promise<any>;
}
