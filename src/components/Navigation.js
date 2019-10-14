import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import AuthenticationService, {EMPLOYEE_ROLE} from '../services/AuthenticationService';

import "../css/Navigation.css";

class Navigation extends Component {
    render() {
        return (
            <nav id="navigation-container">
                <ul className="navigation-item" id="navigation-left">
                    <li><Link className="nav-link nav-link-left-most" to="/admin-user">Felhasználók Kezelése</Link></li>
                    <li><Link className="nav-link" to="/admin-institution">Intézmények Kezelése</Link></li>
                    {AuthenticationService.getRole() === EMPLOYEE_ROLE &&
                    <li><Link className="nav-link" to="/admin-home">Intézmény</Link></li>
                    }
                </ul>
                <ul className="navigation-item" id="navigation-right">
                    <li>
                        <Link className="nav-link nav-link-user" to="/profile-settings">{AuthenticationService.getUserName()}</Link>
                    </li>
                    <li className="menu-separator">|</li>
                    <li>
                        <Link className="nav-link nav-link-right-most" to="/"
                              onClick={AuthenticationService.logout}>Kijelentkezés</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Navigation);
