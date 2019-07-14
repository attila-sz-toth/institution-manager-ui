import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService';

import "../css/Navigation.css";

class Navigation extends Component {
    render() {
        return (
            <nav id="navigation-container">
                <ul className="navigation-item" id="navigation-left">
                    <li><Link className="nav-link" to="/admin-home">Felhasználók Kezelése</Link></li>
                </ul>
                <ul className="navigation-item" id="navigation-right">
                    <li>
                        <Link className="nav-link" to="/settings">{AuthenticationService.getUserName()}</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/"
                              onClick={AuthenticationService.logout}>Kijelentkezés</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Navigation);
