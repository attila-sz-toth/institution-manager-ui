import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

import Login from './Login';
import Home from './Home';
import ProtectedRoute from "./ProtectedRoute";


class App extends Component {

    render() {
        return (
            <div className="App container">
                <Router>
                    <Switch>
                        <ProtectedRoute path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>
                        <ProtectedRoute path="/home" exact component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;