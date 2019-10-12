import React, {Component} from 'react';
import UserAdminService from "../../services/UserAdminService";

import '../../css/Main.css';
import InstitutionService from "../../services/InstitutionService";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            role: "",
            institution: "",

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
        this.loadInstitutions();
    }

    loadRoles() {
        UserAdminService.getRoles().then(response => {
            let rows = response.data;
            this.setState({roles: rows});
        });
    }

    loadInstitutions() {
        InstitutionService.getInstitutions().then(response => {
            let rows = response.data.map(institution => institution.institutionName);
            this.setState({institutions: rows});
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

        UserAdminService.addUser(this.state.username, this.state.role, this.state.institution)
            .then(response => {
                console.log("User registered successfully!");
                this.setState({
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });
            }).catch(() => {
            console.log("User registration failed!");
            this.setState({
                isSubmissionFailed: true,
            });
        });
    };

    render() {
        let roles = this.state.roles;
        let roleSearchItems = roles.map((role) =>
            <option key={role}>{role}</option>
        );

        let institutions = this.state.institutions;
        let institutionSearchItems = institutions.map((institution) =>
            <option key={institution}>{institution}</option>
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
                        <option hidden disabled selected value> -- Válassza ki a jogosultságot -- </option>
                        {roleSearchItems}
                    </select>
                    <label>
                        Intézmény:
                    </label>
                    <select id="institution"
                            onChange={this.handleChange}>
                        <option hidden disabled selected value> -- Válassza ki az intézményt -- </option>
                        {institutionSearchItems}
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