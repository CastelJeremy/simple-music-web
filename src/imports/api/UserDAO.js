import { request } from './requestHandler.js';

class UserDAO {
    constructor() {}

    async login(username, password) {
        const response = await request('login', {
            method: 'POST',
            data: {
                username: username,
                password: password,
            },
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return data['access-token'];
        }
    }
}

export default UserDAO;
