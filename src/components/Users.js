import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import '../css/Main.css';
import '../css/Tables.css';
import AuthenticationService from "../services/AuthenticationService";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isDeleteFailed: false,
            isDeleteSuccessful: false
        };
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        AuthenticationService.getUsers().then(response => {
            let rows = response.data.map(user => {
                return (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td><input type="button" value="Törlés" onClick={() => this.handleDelete(user.username)}
                                   className="delete-button"/>
                        </td>
                    </tr>
                );
            });
            this.setState({users: rows});
        });
    }

    handleDelete(username) {
        AuthenticationService.deleteUser(username)
            .then(response => {
                console.log("User is deleted successfully!");
                this.setState({
                    isDeleteFailed: false,
                    isDeleteSuccessful: true
                });
                this.loadUsers();
            }).catch(() => {
            console.log("User deletion failed!");
            this.setState({
                isDeleteFailed: true,
            });
        });
    };

    render() {
        return (
            <div className="users-container">
                <table className="users-table">
                    <thead>
                    <tr>
                        <th>FELHASZNÁLÓNÉV</th>
                        <th>JOGOSULTSÁG</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users}
                    </tbody>
                </table>

                {this.state.isDeleteFailed &&
                <label className="error-message">A felhasználó törlése sikertelen!</label>}
                {this.state.isDeleteSuccessful &&
                <label className="success-message">A felhasználó sikeresen törölve!</label>}
            </div>
        );
    }
}

export default Users;