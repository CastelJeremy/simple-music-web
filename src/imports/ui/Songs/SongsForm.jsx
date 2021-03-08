import React from 'react';
import {
    Button,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    Input,
    FormHelperText,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import SongDAO from '../../api/SongDAO.js';
import Song from '../../api/Song.js';

const styles = (theme) => ({
    input: {
        marginBottom: theme.spacing(1),
    },
});

class SongsForm extends React.Component {
    constructor(props) {
        super(props);

        const song = this.props.song;

        this.state = {
            id: song ? song.getId() : null,
            name: song ? song.getName() : '',
            length: song ? song.getLength() : 0,
            nameError: '',
            lengthError: '',
            loading: false,
        };

        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputLength = this.handleInputLength.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validLength(length) {
        if (Number.isNaN(parseInt(length))) {
            return 'Not a number.';
        } else if (length <= 0) {
            return 'Not positive.';
        } else {
            return '';
        }
    }

    handleInputName(event) {
        this.setState({
            nameError: event.target.value ? '' : 'Empty field.',
        });

        this.setState({
            name: event.target.value,
        });
    }

    handleInputLength(event) {
        const length = event.target.value;

        this.setState({
            lengthError: this.validLength(length),
            length: length,
        });
    }

    handleSubmit(event) {
        this.setState({
            lengthError: this.validLength(this.state.length),
            nameError: this.state.name ? '' : 'Empty field.',
        });

        if (this.state.name && this.validLength(this.state.length) === '') {
            this.setState({
                loading: true,
            });

            const song = new Song(
                this.state.id,
                this.props.album,
                this.state.name,
                parseInt(this.state.length)
            );

            const songDao = new SongDAO();

            if (song.getId() === null) {
                songDao
                    .post(this.props.user.getToken(), song)
                    .then((song) => {
                        this.props.refreshSongs();
                        this.props.onClose();
                    })
                    .catch((err) => {
                        if (err.statusCode) {
                            if (err.statusCode === 400) {
                                this.setState({
                                    nameError: 'Invalid field.',
                                    lengthError: 'Invalid field.',
                                });
                            } else if (err.statusCode === 401) {
                                this.props.onLogout();
                            }
                        }

                        this.props.onClose();
                    });
            } else {
                songDao
                    .put(this.props.user.getToken(), song)
                    .then((song) => {
                        this.props.refreshSongs();
                        this.props.onClose();
                    })
                    .catch((err) => {
                        if (err.statusCode) {
                            if (err.statusCode === 400) {
                                this.setState({
                                    nameError: 'Invalid field.',
                                    lengthError: 'Invalid field.',
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
                    {this.props.song ? 'Editing' : 'Creating'}
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
                            error={Boolean(this.state.lengthError)}
                            size="small"
                        >
                            <InputLabel>Length (seconds)</InputLabel>

                            <Input
                                type="number"
                                value={this.state.length}
                                onChange={this.handleInputLength}
                            />

                            <FormHelperText>
                                {this.state.lengthError}
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
                        ) : this.props.song ? (
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

export default withStyles(styles)(SongsForm);
