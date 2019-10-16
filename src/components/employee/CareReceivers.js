import AuthenticationService, {EMPLOYEE_ROLE} from "../../services/AuthenticationService";
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import CareReceiversGrid from "./CareReceiversGrid";

class CareReceivers extends Component {
    render() {
        if (AuthenticationService.getRole() === EMPLOYEE_ROLE) {
            return (
                <div className="main-component">
                    <h3>Ellátottak</h3>
                    <CareReceiversGrid/>
                </div>
            );
        } else {
            return <Redirect to="/login"/>
        }
    }
}

export default CareReceivers;