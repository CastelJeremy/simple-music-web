import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { navigate, Router } from '@reach/router';

import Login from './Login/Login.jsx';
import Albums from './Albums/Albums.jsx';
import Songs from './Songs/Songs.jsx';

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
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

    componentDidMount() {
        if (!this.state.user) {
            navigate('/');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== prevState.user) {
            if (this.state.user) {
                navigate('/albums');
            } else {
                navigate('/');
            }
        }
    }

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <Router className={this.props.classes.root}>
                    <Login path="/" onLogin={this.handleLogin} />
                    <Albums
                        path="/albums"
                        user={this.state.user}
                        onLogout={this.handleLogout}
                    />
                    <Songs
                        path="/albums/:albumId"
                        user={this.state.user}
                        onLogout={this.handleLogout}
                    />
                </Router>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
