import React, {Component} from 'react';

import "../css/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isUsernameValid: true,
            isSubmitEnabled: false,
        };

        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username": this.state.username, "password": this.state.password})
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            alert(JSON.stringify(myJson));
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
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
