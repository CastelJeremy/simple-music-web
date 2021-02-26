import React from 'react';
import { navigate, Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

import Login from './Login/Login.jsx';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#a6d4fa',
            main: '#90caf9',
            dark: '#648dae',
        },
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(user) {
        this.setState({
            user: user,
        });
    }

    componentDidMount() {
        if (!this.state.user) {
            navigate('/login');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user !== prevState.user) {
            if (!this.state.user) {
                navigate('/login');
            } else {
                navigate('/');
            }
        }
    }

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <Router>
                    <Login path="/login" handleLogin={this.handleLogin} />
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;
