import React from 'react';

import AlbumsNav from './AlbumsNav.jsx';
import AlbumsList from './AlbumsList.jsx';
import AlbumDAO from '../../api/AlbumDAO.js';

class Albums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
        };
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
                            this.onLogout();
                        }
                    }
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <AlbumsNav onLogout={this.props.onLogout} />
                <AlbumsList albums={this.state.albums} />
            </React.Fragment>
        );
    }
}

export default Albums;
