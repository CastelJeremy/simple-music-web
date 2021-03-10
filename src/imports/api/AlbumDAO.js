import { request } from './requestHandler.js';
import Album from './Album.js';

class AlbumDAO {
    constructor() {}

    async getAll(token) {
        const response = await request('albums', {
            method: 'GET',
            token: token,
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            let albums = [];

            for (const albumData of data) {
                albums.push(
                    new Album(albumData.id, albumData.name, albumData.author)
                );
            }

            return albums;
        }
    }

    async post(token, album) {
        const response = await request('albums', {
            method: 'POST',
            token: token,
            data: album.toObject(),
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Album(data.id, data.name, data.author);
        }
    }

    async get(token, albumId) {
        const response = await request(`albums/${albumId}`, {
            method: 'GET',
            token: token,
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Album(data.id, data.name, data.author);
        }
    }

    async put(token, album) {
        const response = await request(`albums/${album.getId()}`, {
            method: 'PUT',
            token: token,
            data: album.toObject(),
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Album(data.id, data.name, data.author);
        }
    }

    async delete(token, albumId) {
        const response = await request(`albums/${albumId}`, {
            method: 'DELETE',
            token: token,
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Album(data.id, data.name, data.author);
        }
    }
}

export default AlbumDAO;
