import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Registration extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const login = e.target.elements[0].value;
        const password = e.target.elements[0].value;
        const email = e.target.elements[0].value;
        window.localStorage.setItem('rr_login', login);
        window.localStorage.setItem('rr_password', password);
        window.localStorage.setItem('rr_email', email);
        if ((login.length > 4) && (password.length > 4) && ) {
            this.context.router.history.push('/todolist')
        } else {
            alert('Input valid login and password')
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>Пожалуйста, заполните все поля</div>
                <form className='col-md-4' onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='login'/>
                    <input type='password' placeholder='password'/>
                    <input type='password' placeholder='Confirm the password'/>
                    <input type='email' placeholder='email'/>
                    <button type='submit'>Зарегистрироваться</button>
                </form>
            </div>
        )
    }
}

Registration.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Registration