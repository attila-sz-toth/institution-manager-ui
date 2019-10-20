import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService';
import Navigation from "./Navigation";
import '../css/Main.css';

class ProtectedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <div id="protected-route-container">
                    <Navigation/>
                    <div className="main-content">
                        <Route {...this.props}/>
                    </div>
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default ProtectedRoute