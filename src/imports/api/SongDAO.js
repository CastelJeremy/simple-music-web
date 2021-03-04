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
}

export default SongDAO;
