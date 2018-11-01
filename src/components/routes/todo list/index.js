import React, { Component } from 'react'
import ToDoList from '../../todo components/ToDoList.js'
import {Route, Switch} from 'react-router-dom'

export default class todoListReplace extends Component {
    static onEnter(nextState, replace) {
        const login = window.localStorage.getItem('rr_login')
        const password = window.localStorage.setItem('rr_password');
            if ((login.length < 4) && (password.length < 4)) {
            replace('/')
        }
    }

    render() {
        return (
            <Switch>
                <Route exact path='/todo list' component={ToDoList}/>
            </Switch>
        )
    }
}