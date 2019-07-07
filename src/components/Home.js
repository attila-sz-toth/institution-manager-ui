import React, {Component} from 'react';
import AuthenticationService, {ADMIN_ROLE, EMPLOYEE_ROLE} from "../services/AuthenticationService";
import {Redirect} from "react-router-dom";

class Home extends Component {
    render() {
        if (AuthenticationService.getRole() === ADMIN_ROLE) {
            return <Redirect to="/admin-home"/>
        } else if (AuthenticationService.getRole() === EMPLOYEE_ROLE) {
            return <Redirect to="/employee-home"/>
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default Home;