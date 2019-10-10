import React, {Component} from 'react';
import UserAdminService from "../../services/UserAdminService";

import '../../css/Main.css';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: "ADMIN",
            roles: [],
            institutions: [],

            isUsernameValid: true,
            isUserExist: false,
            isSubmitEnabled: false,
            isDeleteFailed: false,
            isDeleteSuccessful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.loadRoles();
    }

    loadRoles() {
        UserAdminService.getRoles().then(response => {
            let rows = response.data;
            this.setState({roles: rows});
        });
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
        let isUsernameValidUpdate = AddUser.validateEmail(event.target.value);
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

        UserAdminService.addUser(this.state.username, this.state.role)
            .then(response => {
                console.log("User registered successfully!");
                this.setState({
                    isDeleteFailed: false,
                    isDeleteSuccessful: true
                });
            }).catch(() => {
            console.log("User registration failed!");
            this.setState({
                isDeleteFailed: true,
            });
        });
    };

    render() {
        let roles = this.state.roles;
        let roleSearchItems = roles.map((role) =>
            <option key={role}>{role}</option>
        );

        return (
            <div>
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
                        {roleSearchItems}
                    </select>
                    <label>
                        Intézmény:
                    </label>
                    <select id="role"
                            onChange={this.handleChange}>
                        //TODO: populate drop down from DB
                        <option value="ADMIN">Aminisztrátor</option>
                        <option value="EMPLOYEE">Alkalmazott</option>
                    </select>

                    <button type="submit" disabled={!this.state.isSubmitEnabled}>Új Felhasználó Hozzáadása</button>
                    {this.state.isDeleteFailed &&
                    <label className="error-message">Új felhasználó hozzáadása sikertelen!</label>}
                    {this.state.isDeleteSuccessful &&
                    <label className="success-message">Új felhasználó sikeresen hozzáadva!</label>}
                </form>
            </div>
        );
    }
}

export default AddUser;