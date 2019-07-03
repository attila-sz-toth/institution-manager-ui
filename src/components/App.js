import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

import Login from './Login';
import Home from './Home';


class App extends Component {
    render() {
        return (
            <div className="App container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;