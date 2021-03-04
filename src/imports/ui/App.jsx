import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';

import Nav from './components/Nav.jsx';
import Login from './Login/Login.jsx';
import Home from './Home/Home.jsx';

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
        flexGrow: '1',
        display: 'flex',
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

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <div className={this.props.classes.root}>
                    <Nav
                        user={this.state.user}
                        handleLogout={this.handleLogout}
                    />

                    <div className={this.props.classes.body}>
                        {this.state.user ? (
                            <Home
                                user={this.state.user}
                                handleLogout={this.handleLogout}
                            />
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
