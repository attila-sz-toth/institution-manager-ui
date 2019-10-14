import React, {Component} from 'react';
import UserAdminService from "../../services/UserAdminService";

import '../../css/Main.css';
import InstitutionService from "../../services/InstitutionService";
import {ADMIN_ROLE, EMPLOYEE_ROLE} from "../../services/AuthenticationService";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            role: "",
            institution: "",

            rolesOptions: [],
            institutionOptions: [],

            isUsernameValid: false,
            isSubmissionFailed: false,
            isSubmissionSuccessful: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    componentDidMount() {
        this.loadRoles();
        this.loadInstitutions();
    }

    loadRoles() {
        UserAdminService.getRoles().then(response => {
            let rows = response.data;
            this.setState({rolesOptions: rows});
        });
    }

    loadInstitutions() {
        InstitutionService.getInstitutionNames().then(response => {
            let rows = response.data;
            this.setState({institutionOptions: rows});
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleUsernameChange(event) {
        //check if user name exists
        let isUsernameValidUpdate = this.validateEmail(event.target.value);
        this.setState({
            [event.target.id]: event.target.value,
            isUsernameValid: isUsernameValidUpdate,
        });
    };

    isSubmitEnabled() {
        let userNameValid = this.state.isUsernameValid;
        let nameValid = this.state.name.length > 0;
        let roleValid = this.state.role.length > 0;
        let institutionValid = (this.state.role === ADMIN_ROLE) || this.state.institution.length > 0;

        return (userNameValid && nameValid && roleValid && institutionValid);
    };

    validateEmail(email) {
        let regEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return email.length === 0 || regEx.test(String(email).toLowerCase());
    };

    handleSubmit(event) {
        event.preventDefault();

        UserAdminService.addUser(this.state.username, this.state.name, this.state.role, this.state.institution)
            .then(response => {
                console.log("User registered successfully!");
                this.setState({
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });

                this.resetForm()
            }).catch(() => {
            console.log("User registration failed!");
            this.setState({
                isSubmissionFailed: true,
                isSubmissionSuccessful: false
            });
        });
    };

    resetForm() {
        this.setState({
            username: "",
            name: "",
            role: "",
            institution: "",
        });
        document.getElementById("add-user-form").reset();
    }

    render() {
        let roles = this.state.rolesOptions;
        let roleSearchItems = roles.map((role) =>
            <option key={role.value} value={role.value}>{role.description}</option>
        );

        let institutions = this.state.institutionOptions;
        let institutionSearchItems = institutions.map((institution) =>
            <option key={institution} value={institution}>{institution}</option>
        );

        let isSubmitEnabled = this.isSubmitEnabled();

        return (
            <div>
                <form id="add-user-form" className="main-form" onSubmit={this.handleSubmit}>
                    <label>
                        Felhasználónév (e-mail cím):
                    </label>
                    <input id="username"
                           type="text"
                           onChange={this.handleUsernameChange}
                    />
                    <label>
                        Név:
                    </label>
                    <input id="name"
                           type="text"
                           onChange={this.handleChange}
                    />
                    <label>
                        Jogosultsági kör:
                    </label>
                    <select id="role"
                            onChange={this.handleChange}>
                        <option hidden disabled selected value> -- Válassza ki a jogosultságot --</option>
                        {roleSearchItems}
                    </select>
                    {
                        this.state.role === EMPLOYEE_ROLE &&
                        <div>
                            <label>
                                Intézmény:
                            </label>
                            <select id="institution"
                                    onChange={this.handleChange}>
                                <option hidden disabled selected value> -- Válassza ki az intézményt --</option>
                                {institutionSearchItems}
                            </select>
                        </div>
                    }

                    <button type="submit" disabled={!isSubmitEnabled}>Új Felhasználó Hozzáadása</button>
                    {this.state.isSubmissionFailed &&
                    <label className="error-message">Új felhasználó hozzáadása sikertelen!</label>}
                    {this.state.isSubmissionSuccessful &&
                    <label className="success-message">Új felhasználó sikeresen hozzáadva!</label>}
                </form>
            </div>
        );
    }
}

export default AddUser;