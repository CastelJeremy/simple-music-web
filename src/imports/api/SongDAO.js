import { request } from './requestHandler.js';
import Album from './Album.js';
import Song from './Song.js';

class SongDAO {
    constructor() {}

    async getAllByAlbum(token, album) {
        const response = await request(`songs?album_id=${album.getId()}`, {
            method: 'GET',
            token: token,
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            let songs = [];

            for (const songData of data) {
                const albumData = songData.album;

                songs.push(
                    new Song(
                        songData.id,
                        new Album(
                            albumData.id,
                            albumData.name,
                            albumData.author
                        ),
                        songData.name,
                        songData.length
                    )
                );
            }

            return songs;
        }
    }

    async post(token, song) {
        const response = await request('songs', {
            method: 'POST',
            token: token,
            data: song.toObject(),
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Song(
                data.id,
                new Album(data.album.id, data.album.name, data.album.author),
                data.name,
                data.length
            );
        }
    }

    async put(token, song) {
        const response = await request(`songs/${song.getId()}`, {
            method: 'PUT',
            token: token,
            data: song.toObject(),
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Song(
                data.id,
                new Album(data.album.id, data.album.name, data.album.author),
                data.name,
                data.length
            );
        }
    }

    async delete(token, songId) {
        const response = await request(`songs/${songId}`, {
            method: 'DELETE',
            token: token,
        });

        const data = await response.json();

        if (data.statusCode) {
            throw data;
        } else {
            return new Song(
                data.id,
                new Album(data.album.id, data.album.name, data.album.author),
                data.name,
                data.length
            );
        }
    }
}

export default SongDAO;
