import React, {Component} from 'react';

import "../css/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginData: {
                username: '',
                password: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            LoginData: {
                username: event.target.username,
                password: event.target.password
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.LoginData)
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            alert(JSON.stringify(myJson));
        });
    }

    render() {
        return (
            <div className="login">
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input id="username"
                               type="text"
                               value={this.state.LoginData.username}
                               onChange={this.handleChange}
                               placeholder="E-mail"/>
                        <input id="password"
                               type="password"
                               value={this.state.LoginData.password}
                               onChange={this.handleChange}
                               placeholder="Jelszó"/>
                        <button type="submit">Bejelentkezés</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
