import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService';
import Navigation from "./Navigation";

class ProtectedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <div id="main">
                    <Navigation/>
                    <Route {...this.props} />
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default ProtectedRoute