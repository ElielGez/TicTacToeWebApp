import Auth from './controllers/auth/auth';
import Engine from './controllers/user/engine';
class ApiSDK {
    private baseUrl: string;

    constructor(baseUrl: string = '') {
        this.baseUrl = baseUrl;
    }
    auth() {
        return new Auth(this.baseUrl);
    }
    engine() {
        return new Engine(this.baseUrl);
    }
}

export const localSDK = new ApiSDK('https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production');
