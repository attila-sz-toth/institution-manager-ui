import React, {Component} from 'react';
import AuthenticationService from '../services/AuthenticationService';

class EmployeeHome extends Component {
    render() {
        return (
            <div className="welcome">
                Welcome {AuthenticationService.getUserName()}!
                Your role is: {}
            </div>
        );
    }
}

export default EmployeeHome;