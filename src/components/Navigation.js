import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import AuthenticationService, {ADMIN_ROLE, EMPLOYEE_ROLE} from '../services/AuthenticationService';

import "../css/Navigation.css";

class Navigation extends Component {
    render() {
        let institution = AuthenticationService.getInstitution();

        return (
            <nav id="navigation-container">
                {
                    AuthenticationService.getRole() === ADMIN_ROLE &&
                    <ul className="navigation-item" id="navigation-left">
                        <li><Link className="nav-link nav-link-left-most" to="/admin-user">Felhasználók Kezelése</Link>
                        </li>
                        <li><Link className="nav-link" to="/admin-institution">Intézmények Kezelése</Link></li>
                    </ul>
                }
                {
                    AuthenticationService.getRole() === EMPLOYEE_ROLE &&
                    <ul className="navigation-item" id="navigation-left">
                        <li className="nav-title">{institution}</li>
                        <li className="menu-separator">|</li>
                        <li><Link className="nav-link nav-link-first" to="/employee-home">Intézmény Adatai</Link></li>
                        <li><Link className="nav-link" to="/care-receivers">Ellátottak Kezelése</Link></li>
                        <li><Link className="nav-link" to="/add-care-receiver">Új Ellátott felvétele</Link></li>
                    </ul>
                }
                <ul className="navigation-item" id="navigation-right">
                    <li>
                        <Link className="nav-link nav-link-user nav-link-last"
                              to="/profile-settings">{AuthenticationService.getUserName()}</Link>
                    </li>
                    <li className="menu-separator">|</li>
                    <li>
                        <Link className=" nav-link nav-link-right-most" to="/"
                              onClick={AuthenticationService.logout}>Kijelentkezés
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Navigation);
