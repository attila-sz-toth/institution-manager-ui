import React, {Component} from 'react';
import {Route} from "react-router-dom";
import AdminHome from "./AdminHome";
import EmployeeHome from "./EmployeeHome";
import AuthenticationService, {ADMIN_ROLE, EMPLOYEE_ROLE} from '../services/AuthenticationService'

class Home extends Component {

    render() {
        if (AuthenticationService.getRole() === ADMIN_ROLE) {
            return <AdminHome/>
        } else if (AuthenticationService.getRole() === EMPLOYEE_ROLE) {
            return <EmployeeHome/>
        }
    }
}

export default Home;