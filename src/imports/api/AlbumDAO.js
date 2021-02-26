import { request } from './requestHandler.js';

class AlbumDAO {
    constructor() {}

    async getAll(token) {
        return request('albums', {
            method: 'GET',
            token: token,
        });
    }
}

export default AlbumDAO;
