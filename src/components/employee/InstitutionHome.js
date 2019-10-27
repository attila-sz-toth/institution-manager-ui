import React, {Component} from 'react';
import AuthenticationService, {ADMIN_ROLE} from '../../services/AuthenticationService';
import {Redirect} from "react-router-dom";
import InstitutionDetails from "./InstitutionDetails";
import Statistics from "./Statistics";
import NormativeManager from "../admin/NormativeManager";

class InstitutionHome extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <div className="main-component">
                    <h3>Intézmény Adatai</h3>
                    <InstitutionDetails/>
                    <h3>Statisztikai Adatok</h3>
                    <Statistics/>
                    {
                        AuthenticationService.getRole() == ADMIN_ROLE &&
                        <div>
                            <h3>Normatíva</h3>
                            <NormativeManager/>
                        </div>
                    }
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default InstitutionHome;