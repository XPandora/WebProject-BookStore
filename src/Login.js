import React, { Component } from 'react';


function LogoutState(props) {
    return (
        <li>
            <a onclick={props.onclick}>请登录</a>
        </li>
    );
}

function LoginState(props) {
    return (
        <li>
            你好！
        </li>
    );
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };

        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutState onclick={this.handleLogoutClick} />;
        }
        else {
            button = <LoginState onclick={this.handleLoginClick} />;
        }

        return button;
    }
}

export default Login;