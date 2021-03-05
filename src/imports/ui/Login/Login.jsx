import React from 'react';

import LoginNav from './LoginNav.jsx';
import LoginForm from './LoginForm.jsx';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <LoginNav />
                <LoginForm onLogin={this.props.onLogin} />
            </React.Fragment>
        );
    }
}

export default Login;
