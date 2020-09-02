import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import HomeButton from './Home';

class Login extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        notfound: '',
        noPassword: '',
        noEmail: ''
    };

    handleChange = (event) => {
        const { name, value } = event.target;

        // Set the state of the login details
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://api.samjohnson-dev.com/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if(res.status === 200) {
                window.localStorage.setItem('token', res.data.token);
                this.setState({ redirect: true });
            } else {
                this.setState({
                    error: res.error
                })
            }
        }).catch(err => {
            // Capture the errors that come back from the api
            this.setState({
                noPassword: err.response.data.noPasword ? err.response.data.noPasword : '',
                noEmail: err.response.data.noEmail ? err.response.data.noEmail : '',
                notfound: err.response.data.error ? err.response.data.error : ''
            })
        })
    }

    render(){
        const { redirect } = this.state;
        const token = window.localStorage.getItem('token');

        if(redirect || token) {
            return <Redirect to='/account'/>;
        }

        return(
            
            <div className='login'>
                <HomeButton />
                <Form className='login-form' onSubmit={this.handleSubmit}>
                    <h1>Login to see your beans</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            onChange={this.handleChange}
                            />
                    <Form.Text className="text-danger">
                        {this.state.noEmail}
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            onChange={this.handleChange}
                            />
                        <Form.Text className="text-danger">
                            {this.state.noPassword}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="outline-secondary" type="submit">
                        Login
                    </Button>
                    <Link className='register-link' to='/register'>No account? register here</Link>
                    <Form.Text className="text-danger">
                            {this.state.notfound ? `${this.state.notfound} please try again.` : ''} 
                        </Form.Text>
                </Form>
            </div>
        )
    }
}

export default Login;