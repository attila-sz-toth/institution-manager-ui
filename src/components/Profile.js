import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import '../css/Main.css';
import '../css/Profile.css';
import AuthenticationService from "../services/AuthenticationService";
import UserService from "../services/UserProfileService";
import UserAdminService from "../services/UserAdminService";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newPasswordAgain: "",

            user: "",

            isPasswordValid: true,
            isPasswordsMatch: true,
            isError: false,
            isSuccess: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validatePasswords = this.validatePasswords.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadUser(AuthenticationService.getUserName());
    }

    loadUser(username) {
        UserAdminService.getUserByUserName(username).then(response => {
            let user =
                <tr key={response.data.username}>
                    <td className="users-table-cell">{response.data.username}</td>
                    <td className="users-table-cell">{response.data.name}</td>
                    <td className="users-table-cell">{response.data.role.description}</td>
                    <td className="users-table-cell">{response.data.institution}</td>
                </tr>;
            this.setState({
                user: user
            });
        });
    };

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

    isSubmitEnabled() {
        return this.state.currentPassword.length > 0
            && this.state.newPassword.length > 0
            && this.state.newPasswordAgain.length > 0
            && this.state.isPasswordValid
            && this.state.isPasswordsMatch;
    }

    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            let submitEnabled = this.isSubmitEnabled();

            return (
                <div className="main-component">
                    <h3>Saját adatok</h3>
                    <table className="table-main">
                        <thead>
                        <tr>
                            <th className="table-main-header" id="e-mail">Felhasználónév (e-mail cím)</th>
                            <th className="table-main-header" id="e-mail">Név</th>
                            <th className="table-main-header" id="role">Jogosultsági kör</th>
                            <th className="table-main-header" id="institution">Intézmény</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.user}
                        </tbody>
                    </table>
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
                        <button type="submit" disabled={!submitEnabled}>Jelszó megváltoztatása</button>
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