import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

import Login from './Login';
import Home from './Home';
import ProtectedRoute from "./ProtectedRoute";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: true};
    }

    render() {
        return (
            <div className="App container">
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/login" exact component={Login}/>
                        <ProtectedRoute path="/home" exact component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;