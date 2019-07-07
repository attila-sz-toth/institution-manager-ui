import React, {Component} from 'react';
import AuthenticationService from "../services/AuthenticationService";
import {Redirect} from "react-router-dom";

class Home extends Component {
    render() {
        if (AuthenticationService.getRole() === '[ADMIN]') {
            return <Redirect to="/admin-home"/>
        } else if (AuthenticationService.getRole() === '[EMPLOYEE]') {
            return <Redirect to="/employee-home"/>
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default Home;