import React, {Component} from 'react';
import AuthenticationService, {ADMIN_ROLE} from '../services/AuthenticationService';
import {Redirect} from "react-router-dom";

class AdminHome extends Component {
    render() {
        if (AuthenticationService.getRole() === ADMIN_ROLE) {
            return (
                <div className="welcome">
                    Welcome {AuthenticationService.getUserName()}!
                    <br/>
                    Your role is: {AuthenticationService.getRole()}.
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default AdminHome;