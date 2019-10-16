import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import AdminHome from "./admin/AdminHome";
import EmployeeHome from "./employee/EmployeeHome";
import Home from "./Home";
import Profile from "./Profile";
import AdminInstitution from "./admin/AdminInstitution";
import CareReceivers from "./employee/CareReceivers";


class App extends Component {
    render() {
        return (
            <div className="App container">
                <Router>
                    {/*{AuthenticationService.isUserLoggedIn() && <Navigation/>}*/}
                    <Switch>
                        <ProtectedRoute path="/" exact component={Home}/>
                        <ProtectedRoute path="/home" exact component={Home}/>
                        <ProtectedRoute path="/profile-settings" exact component={Profile}/>
                        <ProtectedRoute path="/admin-user" exact component={AdminHome}/>
                        <ProtectedRoute path="/admin-institution" exact component={AdminInstitution}/>
                        <ProtectedRoute path="/employee-home" exact component={EmployeeHome}/>
                        <ProtectedRoute path="/care-receivers" exact component={CareReceivers}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;