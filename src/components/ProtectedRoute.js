import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService';

class ProtectedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default ProtectedRoute