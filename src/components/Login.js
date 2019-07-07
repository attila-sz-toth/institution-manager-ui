import React, {Component} from 'react';
import AuthenticationService from '../services/AuthenticationService'

import "../css/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isUsernameValid: true,
            isSubmitEnabled: false,
            isLoginFailed: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isSubmitEnabledUpdate = this.isSubmitEnabledUpdate.bind(this);
        this.validateUserName = this.validateUserName.bind(this);
    }

    handleChange(event) {
        let submitEnabledUpdate = this.isSubmitEnabledUpdate();
        this.setState({
            [event.target.id]: event.target.value,
            isSubmitEnabled: submitEnabledUpdate,
        });
    };

    isSubmitEnabledUpdate() {
        return (this.state.isUsernameValid)
            && (this.state.password.length > 0);
    };

    validateUserName(event) {
        let isUsernameValidUpdate = Login.validateEmail(event.target.value);
        this.setState({
            isUsernameValid: isUsernameValidUpdate
        });
    }

    static validateEmail(email) {
        let regEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return email.length === 0 || regEx.test(String(email).toLowerCase());
    };

    handleSubmit(event) {
        event.preventDefault();

        AuthenticationService
            .login(this.state.username, this.state.password)
            .then(response => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password, response.data.role);
                this.props.history.push(`/home`);
                this.setState({
                    isLoginFailed: false,
                });
            }).catch(() => {
            console.log("Authentication failed!");
            this.setState({
                isLoginFailed: true,
            });
        });
    };

    render() {
        return (
            <div className="login">
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input id="username"
                               type="text"
                               value={this.state.username}
                               onChange={this.handleChange}
                               onBlur={this.validateUserName}
                               placeholder="E-mail"/>
                        {!this.state.isUsernameValid && <label className="error-message">Hibás e-mail formátum!</label>}
                        <input id="password"
                               type="password"
                               value={this.state.password}
                               onChange={this.handleChange}
                               placeholder="Jelszó"/>
                        <button type="submit" disabled={!this.state.isSubmitEnabled}>Bejelentkezés</button>
                        <a className="form-link" href="?">Elfelejtettem a jelszavam!</a>
                        {this.state.isLoginFailed &&
                        <label className="error-message">Hibás felhasználónév vagy jelszó!</label>}
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
