import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import AlbumDAO from '../../api/AlbumDAO.js';
import SongDAO from '../../api/SongDAO.js';
import SongsList from './SongsList.jsx';
import SongsNav from './SongsNav.jsx';
import SongsForm from './SongsForm.jsx';
import SongsConfirm from './SongsConfirm.jsx';

class Songs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            album: null,
            song: null,
            songs: [],
            dialogOpen: false,
            dialogType: null,
        };

        this.toggleDialog = this.toggleDialog.bind(this);
        this.refreshSongs = this.refreshSongs.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    toggleDialog(type = null) {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
            dialogType: type,
        });
    }

    handleDelete(song) {
        this.setState({
            song: song,
        });

        this.toggleDialog('confirm');
    }

    refreshSongs() {
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
                this.refreshSongs();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <SongsNav
                    album={this.state.album}
                    onLogout={this.props.onLogout}
                    onCreate={() => this.toggleDialog('form')}
                />

                <SongsList
                    songs={this.state.songs}
                    onDelete={this.handleDelete}
                />

                <Dialog
                    disableRestoreFocus={true}
                    open={this.state.dialogOpen}
                    onClose={() => this.toggleDialog()}
                >
                    {this.state.dialogType === 'form' ? (
                        <SongsForm
                            album={this.state.album}
                            song={this.state.song}
                            user={this.props.user}
                            refreshSongs={this.refreshSongs}
                            onClose={() => this.toggleDialog()}
                        />
                    ) : (
                        this.state.dialogType === 'confirm' && (
                            <SongsConfirm
                                song={this.state.song}
                                user={this.props.user}
                                refreshSongs={this.refreshSongs}
                                onClose={() => this.toggleDialog()}
                            />
                        )
                    )}
                </Dialog>
            </React.Fragment>
        );
    }
}

export default Songs;
