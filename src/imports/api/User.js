class User {
    constructor(username, token) {
        this._username = username;
        this._token = token;
    }

    setUsername(username) { this._username = username; }
    getUsername() { return this._username; }

    seToken(token) { this._token = token; }
    getToken() { return this._token; }
}

export default User;