import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import AdminHome from "./AdminHome";
import EmployeeHome from "./EmployeeHome";
import Home from "./Home";
import Profile from "./Profile";


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
                        <ProtectedRoute path="/admin-home" exact component={AdminHome}/>
                        <ProtectedRoute path="/employee-home" exact component={EmployeeHome}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;