import BaseController from '..';
import IAuth from './IAuth';


export default class Auth extends BaseController implements IAuth {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async login(email: string) {
        const response = await this.client.post('/auth', JSON.stringify({ email }));
        if (response?.token) sessionStorage.setItem('token', response.token);
        return response;
    }
}
