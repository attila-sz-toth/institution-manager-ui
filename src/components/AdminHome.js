import React, {Component} from 'react';
import AuthenticationService from '../services/AuthenticationService';

class AdminHome extends Component {
    render() {
        return (
            <div className="welcome">
                Welcome {AuthenticationService.getUserName()}!
            </div>
        );
    }
}

export default AdminHome;