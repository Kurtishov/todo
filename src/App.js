import React, {Component} from 'react';
// import {Route} from 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import './App.css';
import ToDoList from './components/todo components/ToDoList.js'
import './components/todo components/ToDoList.css'
import Login from './components/routes/Login/index.js'
import NotFound from './components/routes/NotFound/index.js'


class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/todolist' component={ToDoList} onEnter={ToDoList.onEnter}/>
                    <Route path='/' exact={true} component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>

        );
    }
}

export default App;