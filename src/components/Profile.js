import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import '../css/Main.css';
import '../css/Profile.css';
import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserService";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newPasswordAgain: "",

            isPasswordValid: true,
            isPasswordsMatch: true,
            isError: false,
            isSuccess: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validatePasswords() {
        this.setState({
            isPasswordValid: this.state.newPassword.length > 0,
            isPasswordsMatch: this.state.newPassword === this.state.newPasswordAgain
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        let userName = AuthenticationService.getUserName();
        UserService
            .updatePassword(userName, this.state.currentPassword, this.state.newPassword)
            .then(response => {
                    this.setState({
                        isError: false,
                        isSuccess: true,

                        currentPassword: "",
                        newPassword: "",
                        newPasswordAgain: "",
                    });
                    document.getElementById("profile-form").reset();
                }
            ).catch(() => {
            console.log("Authentication failed!");
            this.setState({
                isError: true,
                isSuccess: false
            });
            document.getElementById("profile-form").reset();
        });
    };

    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <div className="main-component">
                    <h3>Felhasználó adatai</h3>
                    <label className="user-info">Felhasználónév: {AuthenticationService.getUserName()}</label>
                    <label className="user-info">Jogosultsági kör: {AuthenticationService.getRole()}</label>
                    <h3>Jelszó Megváltoztatása</h3>
                    <form id="profile-form" onSubmit={this.handleSubmit}>
                        <label>
                            Jelenlegi jelszó:
                        </label>
                        <input id="currentPassword"
                               type="password"
                               onChange={this.handleChange}
                        />
                        <label>
                            Új jelszó:
                        </label>
                        <input id="newPassword"
                               type="password"
                               onChange={this.handleChange}
                        />
                        <label>
                            Új jelszó megismétlése:
                        </label>
                        <input id="newPasswordAgain"
                               type="password"
                               onChange={this.handleChange}
                               onBlur={this.validatePasswords}
                        />
                        {!this.state.isPasswordValid &&
                        <label className="error-message">Érvénytelen jelszó</label>}
                        {!this.state.isPasswordsMatch &&
                        <label className="error-message">A beírt jelszavak nem egyeznek!</label>}
                        <button type="submit">Jelszó megváltoztatása</button>
                        {this.state.isError && <label className="error-message">Sikertelen jelszóváltoztatás!</label>}
                        {this.state.isSuccess && <label className="success-message">Sikeres jelszóváltoztatás!</label>}
                    </form>
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default Profile;