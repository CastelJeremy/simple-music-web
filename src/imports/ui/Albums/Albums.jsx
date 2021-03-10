import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import AlbumDAO from '../../api/AlbumDAO.js';
import AlbumsNav from './AlbumsNav.jsx';
import AlbumsList from './AlbumsList.jsx';
import AlbumsConfirm from './AlbumsConfirm.jsx';
import AlbumsForm from './AlbumsForm.jsx';

class Albums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            album: null,
            dialogOpen: false,
            dialogType: null,
        };

        this.toggleDialog = this.toggleDialog.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.refreshAlbums = this.refreshAlbums.bind(this);
    }

    toggleDialog(dialogType) {
        this.setState({
            dialogOpen: !this.state.dialogOpen,
            dialogType: dialogType,
        });
    }

    handleCreate() {
        this.setState({
            album: null,
        });

        this.toggleDialog('form');
    }

    handleEdit(album) {
        this.setState({
            album: album,
        });

        this.toggleDialog('form');
    }

    handleDelete(album) {
        this.setState({
            album: album,
        });

        this.toggleDialog('confirm');
    }

    refreshAlbums() {
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

    componentDidMount() {
        if (this.props.user) {
            this.refreshAlbums();
        }
    }

    render() {
        return (
            <React.Fragment>
                <AlbumsNav
                    onLogout={this.props.onLogout}
                    onCreate={this.handleCreate}
                />

                <AlbumsList
                    albums={this.state.albums}
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}
                />

                <Dialog
                    disableRestoreFocus={true}
                    open={this.state.dialogOpen}
                    onClose={() => this.toggleDialog()}
                >
                    {this.state.dialogType === 'form' ? (
                        <AlbumsForm
                            user={this.props.user}
                            album={this.state.album}
                            refreshAlbums={this.refreshAlbums}
                            onClose={() => this.toggleDialog()}
                        />
                    ) : (
                        this.state.dialogType === 'confirm' && (
                            <AlbumsConfirm
                                user={this.props.user}
                                album={this.state.album}
                                refreshAlbums={this.refreshAlbums}
                                onClose={() => this.toggleDialog()}
                            />
                        )
                    )}
                </Dialog>
            </React.Fragment>
        );
    }
}

export default Albums;
