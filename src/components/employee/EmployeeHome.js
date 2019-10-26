import React, {Component} from 'react';
import AuthenticationService, {EMPLOYEE_ROLE} from '../../services/AuthenticationService';
import {Redirect} from "react-router-dom";
import InstitutionDetails from "./InstitutionDetails";
import Statistics from "./Statistics";

class EmployeeHome extends Component {
    render() {
        if (AuthenticationService.getRole() === EMPLOYEE_ROLE) {
            return (
                <div className="main-component">
                    <h3>Intézmény Adatai</h3>
                    <InstitutionDetails/>
                    <h3>Statisztikai Adatok</h3>
                    <Statistics/>
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default EmployeeHome;