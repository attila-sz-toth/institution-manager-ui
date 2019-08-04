import React, {Component} from 'react';
import '../../css/Main.css';
import UsersGrid from "./UsersGrid";
import AddUser from "./AddUser";

class AdminHome extends Component {

    render() {
        return (
            <div className="main-component">
                <h3>Felhasználók</h3>
                <UsersGrid/>
                <h3>Új felhasználó hozzáadása</h3>
                <AddUser/>
            </div>
        );
    }
}

export default AdminHome;