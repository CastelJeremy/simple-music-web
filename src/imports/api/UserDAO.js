import { request } from './requestHandler.js';

class UserDAO {
    constructor() {}

    async login(username, password) {
        return request('login', {
            method: 'POST',
            data: {
                username: username,
                password: password,
            },
        });
    }
}

export default UserDAO;
