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
                    <tr key={user.institutionName}>
                        <td className="users-table-cell">{user.username}</td>
                        <td className="users-table-cell">{user.role}</td>
                        <td className="users-table-cell">{user.institutions}</td>
                        <td><input type="button" value="Törlés" onClick={() => this.handleDelete(user.institutionName)}
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
                    isSubmissionFailed: false,
                    isSubmissionSuccessful: true
                });
                this.loadUsers();
            }).catch(() => {
            console.log("User deletion failed!");
            this.setState({
                isSubmissionFailed: true,
            });
        });
    };

    render() {

        let pagerArray = new Array(this.state.totalPages).fill(0).map((zero, index) => {
                if (this.state.currentPage === (index)) {
                    return <span className="active">{index + 1}</span>
                } else {
                    return <span onClick={() => this.loadUsers(index)}>{index + 1}</span>
                }
            }
        );

        let pagerNavigationBack = 0 === this.state.currentPage ?
            <span className="active">&laquo;</span> :
            <span onClick={() => this.loadUsers(this.state.currentPage - 1)}>&laquo;</span>;

        let pagerNavigationForward = this.state.totalPages -1 === this.state.currentPage ?
            <span className="active">&raquo;</span> :
            <span onClick={() => this.loadUsers(this.state.currentPage + 1)}>&raquo;</span>;

        return (

            <div className="users-container">
                <table className="users-table">
                    <thead>
                    <tr>
                        <th className="users-table-header" id="e-mail">E-mail cím</th>
                        <th className="users-table-header" id="role">Jogosultsági kör</th>
                        <th className="users-table-header" id="institution">Intézmény</th>
                        <th className="users-table-header" id="action">Művelet</th>
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