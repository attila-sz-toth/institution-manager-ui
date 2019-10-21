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
            currentPage: 0,
            totalPages: 0,

            isDeleteFailed: false,
            isDeleteSuccessful: false
        };
    }

    componentDidMount() {
        this.loadUsers(this.state.currentPage);
    }

    loadUsers(pageNumber) {
        UserAdminService.getUsers(pageNumber).then(response => {
            let rows = response.data.content.map(user => {
                return (
                    <tr key={user.username}>
                        <td className="users-table-cell">{user.username}</td>
                        <td className="users-table-cell">{user.name}</td>
                        <td className="users-table-cell">{user.role.description}</td>
                        <td className="users-table-cell">{user.institution}</td>
                        <td><input type="button" value="Törlés" onClick={() => this.handleDelete(user.username)}
                                   className="delete-button"/>
                        </td>
                    </tr>
                );
            });
            let currentPage = response.data.pageable.pageNumber;
            let totalPages = response.data.totalPages;
            this.setState({
                users: rows,
                currentPage: currentPage,
                totalPages: totalPages
            });
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
                this.loadUsers(this.state.currentPage);
            }).catch(() => {
            console.log("User deletion failed!");
            this.setState({
                isDeleteFailed: true,
                isDeleteSuccessful: false
            });
        });
    };

    render() {

        let pagerArray = new Array(this.state.totalPages).fill(0).map((zero, index) => {
                if (this.state.currentPage === (index)) {
                    return <div className="active">{index + 1}</div>
                } else {
                    return <div onClick={() => this.loadUsers(index)}>{index + 1}</div>
                }
            }
        );

        let pagerNavigationBack = 0 === this.state.currentPage ?
            <div className="active">&laquo;</div> :
            <div onClick={() => this.loadUsers(this.state.currentPage - 1)}>&laquo;</div>;

        let pagerNavigationForward = this.state.totalPages - 1 === this.state.currentPage ?
            <div className="active">&raquo;</div> :
            <div onClick={() => this.loadUsers(this.state.currentPage + 1)}>&raquo;</div>;

        return (

            <div className="users-container">
                <table className="table-main">
                    <thead>
                    <tr>
                        <th className="table-main-header" id="e-mail">Felhasználónév (e-mail cím)</th>
                        <th className="table-main-header" id="e-mail">Név</th>
                        <th className="table-main-header" id="role">Jogosultsági kör</th>
                        <th className="table-main-header" id="institution">Intézmény</th>
                        <th className="table-main-header" id="action">Művelet</th>
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
                    {pagerNavigationBack}
                    {pagerArray}
                    {pagerNavigationForward}
                </div>
            </div>
        );
    }
}

export default UsersGrid;