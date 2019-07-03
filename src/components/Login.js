import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import base64 from 'react-native-base64';
import request from 'request';

import "../css/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isUsernameValid: true,
            isSubmitEnabled: false,
            isLoggedIn: false
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

        let options = {
            method: 'GET',
            url: 'https://localhost:8443/login',
            headers:
                {
                    'cache-control': 'no-cache',
                    Authorization: 'Basic ' + base64.encode(this.state.username + ":" + this.state.password)
                }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
        });

        this.setState({
            isLoggedIn: true
        });
    };

    render() {
        if (this.state.isLoggedIn === true) {
            return (
                <Redirect to='/home'/>
            );
        }

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
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
