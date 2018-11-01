import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Login extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
        this.goToRegistration = this.this.goToRegistration.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const login = e.target.elements[0].value;
        const password = e.target.elements[0].value;
        window.localStorage.setItem('rr_login', login);
        window.localStorage.setItem('rr_password', password);

        if ((login.length > 4) && (password.length > 4)) {
            this.context.router.history.push('/todolist')
        } else {
            alert('Input valid login and password')
        }
    }

    goToRegistration(e) {
        e.preventDefault();
        const login = e.target.elements[0].value;
        const password = e.target.elements[0].value;
        window.localStorage.setItem('rr_login', login);
        window.localStorage.setItem('rr_password', password);

        if ((login.length > 4) && (password.length > 4)) {
            this.context.router.history.push('/todolist')
        } else {
            alert('Input valid login and password')
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>Пожалуйста, введите логин:</div>
                <form className='col-md-4' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='login'/>
                    <input type='password' placeholder='password'/>
                    <button type='submit'>Войти</button>
                    <button type='submit' onClick={this.goToRegistration}>Регистрация</button>
                </form>
            </div>
        )
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Login