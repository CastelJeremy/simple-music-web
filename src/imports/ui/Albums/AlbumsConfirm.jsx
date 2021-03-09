import React from 'react';
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';

import AlbumDAO from '../../api/AlbumDAO.js';

class AlbumsConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({
            loading: true,
        });

        const albumDao = new AlbumDAO();

        albumDao
            .delete(this.props.user.getToken(), this.props.album.getId())
            .then((album) => {
                this.props.refreshAlbums();
                this.props.onClose();
            })
            .catch((err) => {
                if (err.statusCode) {
                    if (err.statusCode === 401) {
                        this.props.onLogout();
                    }
                }

                console.log(err);

                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <DialogTitle>Delete</DialogTitle>

                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete ?
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        onClick={this.handleSubmit}
                        disabled={this.state.loading}
                    >
                        {this.state.loading ? (
                            <CircularProgress size="24.5px" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default AlbumsConfirm;
