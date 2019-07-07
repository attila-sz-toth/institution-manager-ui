import React, {Component} from 'react';
import AuthenticationService, {EMPLOYEE_ROLE} from '../services/AuthenticationService';
import {Redirect} from "react-router-dom";

class EmployeeHome extends Component {
    render() {
        if (AuthenticationService.getRole() === EMPLOYEE_ROLE) {
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

export default EmployeeHome;