import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';

import AlbumDAO from '../../api/AlbumDAO.js';
import Album from '../../api/Album.js';

const styles = (theme) => ({
    input: {
        marginBottom: theme.spacing(1),
    },
});

class AlbumsForm extends React.Component {
    constructor(props) {
        super(props);

        const album = this.props.album;

        this.state = {
            id: album ? album.getId() : null,
            name: album ? album.getName() : '',
            author: album ? album.getAuthor() : '',
            nameError: '',
            authorError: '',
            loading: false,
        };

        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputAuthor = this.handleInputAuthor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputName(event) {
        this.setState({
            name: event.target.value,
            nameError: event.target.value ? '' : 'Empty field.',
        });
    }

    handleInputAuthor(event) {
        this.setState({
            author: event.target.value,
            authorError: event.target.value ? '' : 'Empty field.',
        });
    }

    handleSubmit() {
        this.setState({
            nameError: this.state.name ? '' : 'Empty field.',
            authorError: this.state.author ? '' : 'Empty field.',
        });

        if (this.state.name && this.state.author) {
            this.setState({
                loading: true,
            });

            const album = new Album(
                this.state.id,
                this.state.name,
                this.state.author
            );

            const albumDao = new AlbumDAO();

            if (album.getId() === null) {
                albumDao
                    .post(this.props.user.getToken(), album)
                    .then((album) => {
                        this.props.refreshAlbums();
                        this.props.onClose();
                    })
                    .catch((err) => {
                        if (err.statusCode) {
                            if (err.statusCode === 400) {
                                this.setState({
                                    nameError: 'Invalid field.',
                                    authorError: 'Invalid field.',
                                });
                            } else if (err.statusCode === 401) {
                                this.props.onLogout();
                            }
                        }

                        this.props.onClose();
                    });
            } else {
                albumDao
                    .put(this.props.user.getToken(), album)
                    .then((album) => {
                        this.props.refreshAlbums();
                        this.props.onClose();
                    })
                    .catch((err) => {
                        if (err.statusCode) {
                            if (err.statusCode === 400) {
                                this.setState({
                                    nameError: 'Invalid field.',
                                    authorError: 'Invalid field.',
                                });
                            } else if (err.statusCode === 401) {
                                this.props.onLogout();
                            }
                        }

                        this.props.onClose();
                    });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <DialogTitle>
                    {this.props.album ? 'Editing' : 'Creating'}
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container direction="column">
                        <FormControl
                            className={this.props.classes.input}
                            error={Boolean(this.state.nameError)}
                            size="small"
                        >
                            <InputLabel>Name</InputLabel>

                            <Input
                                value={this.state.name}
                                onChange={this.handleInputName}
                            />

                            <FormHelperText>
                                {this.state.nameError}
                            </FormHelperText>
                        </FormControl>

                        <FormControl
                            className={this.props.classes.input}
                            error={Boolean(this.state.authorError)}
                            size="small"
                        >
                            <InputLabel>Author</InputLabel>

                            <Input
                                value={this.state.author}
                                onChange={this.handleInputAuthor}
                            />

                            <FormHelperText>
                                {this.state.authorError}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button
                        onClick={this.handleSubmit}
                        disabled={this.state.loading}
                    >
                        {this.state.loading ? (
                            <CircularProgress size="24.5px" />
                        ) : this.props.album ? (
                            'Update'
                        ) : (
                            'Add'
                        )}
                    </Button>
                </DialogActions>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AlbumsForm);
