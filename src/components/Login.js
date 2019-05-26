import React, {Component} from 'react';

import "../css/Login.css";

class Login extends Component {

    handleSubmit(data) {
        alert("Failed to log in: no back end service connected!")
    }

    render() {
        return (
            <div className="login">
                <div className="form">
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="E-mail"/>
                        <input type="password" placeholder="Jelszó"/>
                        <button type="submit">Bejelentkezés</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
