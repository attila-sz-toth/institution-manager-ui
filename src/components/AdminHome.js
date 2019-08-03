import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import '../css/Main.css';
import Login from "./Login";
import AuthenticationService from "../services/AuthenticationService";

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: "",
            isUsernameValid: true,
            isSubmitEnabled: false,
            isSubmitFailed: false,
            isSubmitSuccessful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let submitEnabledUpdate = this.isSubmitEnabledUpdate();
        this.setState({
            [event.target.id]: event.target.value,
            isSubmitEnabled: submitEnabledUpdate,
        });
    };

    isSubmitEnabledUpdate() {
        return (this.state.isUsernameValid);
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

        AuthenticationService.addUser(this.state.username, this.state.role)
            .then(response => {
                console.log("User registered successfully!");
                this.setState({
                    isSubmitFailed: false,
                    isSubmitSuccessful: true
                });
            }).catch(() => {
            console.log("User registration failed!");
            this.setState({
                isSubmitFailed: true,
            });
        });
    };

    render() {
        return (
            <div className="main-component">
                <h3>Új felhasználó hozzáadása</h3>
                <form className="main-form" onSubmit={this.handleSubmit}>
                    <label>
                        E-mail cím:
                    </label>
                    <input id="username"
                           type="text"
                           onChange={this.handleChange}
                    />
                    <label>
                        Jogosultsági kör:
                    </label>
                    <select id="role"
                            onChange={this.handleChange}>
                        //TODO: populate drop down from DB
                        <option value=""></option>
                        <option value="ADMIN">Aminisztrátor</option>
                        <option value="EMPLOYEE">Alkalmazott</option>
                    </select>

                    <button type="submit" disabled={!this.state.isSubmitEnabled}>Új Felhasználó Hozzáadása</button>
                    {this.state.isSubmitFailed &&
                    <label className="error-message">Új felhasználó hozzáadása sikertelen!</label>}
                    {this.state.isSubmitSuccessful &&
                    <label className="success-message">Új feljasználó sikeresen hozzáadva!</label>}
                </form>
            </div>
        );
    }
}

export default AdminHome;