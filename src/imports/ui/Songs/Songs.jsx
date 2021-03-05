import React from 'react';

import AlbumDAO from '../../api/AlbumDAO.js';
import SongDAO from '../../api/SongDAO.js';
import SongsList from './SongsList.jsx';
import SongsNav from './SongsNav.jsx';

class Songs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: null,
            songs: [],
        };
    }

    componentDidMount() {
        if (this.props.user) {
            const albumDao = new AlbumDAO();

            albumDao
                .get(this.props.user.getToken(), this.props.albumId)
                .then((album) => {
                    this.setState({
                        album: album,
                    });
                })
                .catch((err) => {
                    if (err.statusCode) {
                        if (err.statusCode === 401) {
                            this.props.onLogout();
                        }
                    }
                });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.album !== prevState.album) {
            if (this.state.album) {
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
                                this.handleLogout();
                            }
                        }
                    });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <SongsNav
                    album={this.state.album}
                    onLogout={this.props.onLogout}
                />
                <SongsList songs={this.state.songs} />
            </React.Fragment>
        );
    }
}

export default Songs;
