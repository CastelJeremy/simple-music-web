import React from 'react';
import AlbumDAO from '../../api/AlbumDAO.js';
import HomeListAlbum from './HomeListAlbum.jsx';

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
    }

    handleAlbumClick(album) {
        this.setState({
            album: album,
        });
    }

    componentDidMount() {
        if (this.props.user) {
            const albumDao = new AlbumDAO();

            try {
                albumDao.getAll(this.props.user.getToken()).then((albums) => {
                    this.setState({
                        albums: albums,
                    });
                });
            } catch (err) {
                if (err.statusCode) {
                    if (err.statusCode === 401) {
                        this.props.handleLogout();
                    }
                }
            }
        }
    }

    render() {
        return (
            <HomeListAlbum
                onClick={this.handleAlbumClick}
                albums={this.state.albums}
            />
        );
    }
}

export default Home;
