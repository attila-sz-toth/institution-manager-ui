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

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        AuthenticationService.getUsers().then(response => {
            let rows = response.data.map(user => {
                console.log(user);
                return (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                    </tr>
                );
            });
            console.log(rows);
            this.setState({users: rows});
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthenticationService.deleteUser(this.state.username)
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
        return (

            <div className="table-container">

                <table className="users-table">
                    <thead>
                    <tr>
                        <th>FELHASZNÁLÓNÉV</th>
                        <th>JOGOSULTSÁG</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users}
                    </tbody>
                </table>

                {/*TO DO: Add pagination*/}
            </div>
        )
            ;
    }
}

export default Users;