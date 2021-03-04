import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';

import Nav from './components/Nav.jsx';
import Login from './Login/Login.jsx';
import AlbumsList from './Albums/AlbumsList.jsx';
import SongsList from './Songs/SongsList.jsx';

import AlbumDAO from '../api/AlbumDAO.js';
import SongDAO from '../api/SongDAO.js';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#a6d4fa',
            main: '#90caf9',
            dark: '#648dae',
        },
        secondary: {
            main: '#333',
            contrastText: '#fff',
        },
    },
});

const styles = (theme) => ({
    root: {
        minHeight: `${window.innerHeight}px`,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    body: {
        marginTop: theme.spacing(8),
        flexGrow: '1',
        display: 'flex',
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            albums: [],
            songs: [],
            album: null,
            song: null,
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleAlbumClick = this.handleAlbumClick.bind(this);
        this.handleSongClick = this.handleSongClick.bind(this);
    }

    handleLogin(user) {
        this.setState({
            user: user,
        });
    }

    handleLogout() {
        this.setState({
            user: null,
        });
    }

    handleAlbumClick(album) {
        this.setState({
            album: album,
            songs: [],
        });
    }

    handleSongClick(song) {
        this.setState({
            song: song,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== prevState.user) {
            if (this.state.user) {
                const albumDao = new AlbumDAO();

                albumDao
                    .getAll(this.state.user.getToken())
                    .then((albums) => {
                        this.setState({
                            albums: albums,
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

        if (this.state.album !== prevState.album) {
            if (this.state.user && this.state.album) {
                const songDao = new SongDAO();

                songDao
                    .getAllByAlbum(this.state.user.getToken(), this.state.album)
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
            <ThemeProvider theme={darkTheme}>
                <div className={this.props.classes.root}>
                    <Nav
                        user={this.state.user}
                        handleLogout={this.handleLogout}
                        album={this.state.album}
                        back={() => this.handleAlbumClick(null)}
                    />

                    <div className={this.props.classes.body}>
                        {this.state.user ? (
                            this.state.album ? (
                                <SongsList
                                    onClick={this.handleSongClick}
                                    album={this.state.album}
                                    songs={this.state.songs}
                                />
                            ) : (
                                <AlbumsList
                                    onClick={this.handleAlbumClick}
                                    albums={this.state.albums}
                                />
                            )
                        ) : (
                            <Login handleLogin={this.handleLogin} />
                        )}
                    </div>
                </div>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
