import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import UserAdminService from "../../services/UserAdminService";

import '../../css/Main.css';
import '../../css/Tables.css';

class UsersGrid extends Component {
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
        UserAdminService.getUsers().then(response => {
            let rows = response.data.map(user => {
                return (
                    <tr key={user.username}>
                        <td className="users-table-cell">{user.username}</td>
                        <td className="users-table-cell">{user.role}</td>
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
        UserAdminService.deleteUser(username)
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
                        <th className="users-table-header">E-mail cím</th>
                        <th className="users-table-header">Jogosultsági kör</th>
                        <th className="users-table-header"></th>
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

                <div className="pagination">
                    <span>&laquo;</span>
                    <span className="active">1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>&raquo;</span>
                </div>
            </div>
        );
    }
}

export default UsersGrid;