import React from 'react';
import AlbumDAO from '../../api/AlbumDAO.js';
import SongDAO from '../../api/SongDAO.js';
import HomeListAlbum from './HomeListAlbum.jsx';
import HomeListSong from './HomeListSong.jsx';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            songs: [],
            album: null,
            song: null,
        };

        this.handleAlbumClick = this.handleAlbumClick.bind(this);
        this.handleSongClick = this.handleSongClick.bind(this);
    }

    handleAlbumClick(album) {
        this.setState({
            album: album,
        });
    }

    handleSongClick(song) {
        this.setState({
            song: song,
        });
    }

    componentDidMount() {
        if (this.props.user) {
            const albumDao = new AlbumDAO();

            albumDao
                .getAll(this.props.user.getToken())
                .then((albums) => {
                    this.setState({
                        albums: albums,
                    });
                })
                .catch((err) => {
                    if (err.statusCode) {
                        if (err.statusCode === 401) {
                            this.props.handleLogout();
                        }
                    }
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.album !== prevState.album) {
            if (this.props.user && this.state.album) {
                const songDao = new SongDAO();

                songDao
                    .getAllByAlbum(this.props.user.getToken(), this.state.album)
                    .then((songs) => {
                        this.setState({
                            songs: songs,
                        });
                    })
                    .catch((err) => {
                        if (err.statusCode) {
                            if (err.statusCode === 401) {
                                this.props.handleLogout();
                            }
                        }
                    });
            }
        }
    }

    render() {
        if (!this.state.album) {
            return (
                <HomeListAlbum
                    onClick={this.handleAlbumClick}
                    albums={this.state.albums}
                />
            );
        } else {
            return (
                <HomeListSong
                    onClick={this.handleSongClick}
                    album={this.state.album}
                    songs={this.state.songs}
                />
            );
        }
    }
}

export default Home;
