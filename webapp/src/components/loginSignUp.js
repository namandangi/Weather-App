import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import  './loginSignUp.css';
// import Cookies from 'js-cookie';

export default class LoginSignUp extends Component {
state = {
	login: 'true',
	name: '',
	email: '',
	password: '',
	token: '',
	systemcall: false
}

	handleLogin = (e) => {
		e.preventDefault();
		this.setState({ login: 'true' });
	}
	handleRegister = (e) => {
		e.preventDefault();
		this.setState({ login: 'false' });
	}
	handleLoginEmail = (e) => {
		this.setState({ email: e.target.value });
	}
	handleLoginPass = (e) => {
		this.setState({ password: e.target.value });
	}
	handleRegisterName = (e) => {
		this.setState({ name: e.target.value });
	}
	handleRegisterEmail = (e) => {
		this.setState({ email: e.target.value });
	}
	handleRegisterPass = (e) => {
		this.setState({ password: e.target.value });
	}
	submitLoginData = async(e) => {
		const response = await fetch('/api/weather/login',
		{
			method:'POST',
			body:JSON.stringify({ email: this.state.email, password: this.state.password }),
			headers: { 'Content-type': 'application/json' }
		});
		const content = await response.json();
		// Cookies.set("token", content.token);
		this.setState({ name: content.name, token: content.token, systemcall: true });
	}
	submitRegisterData = async() => {
	const response = await fetch('/api/weather/register',
		{
			method:'POST',
			body:JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password }),
			headers: { 'Content-type': 'application/json' }
		});
		const content = await response.json();
		// Cookies.set("token", content.token);
		this.setState({ token: content.token, systemcall: true });
	}

	render(){		
		return(
			<div className="card">
				<div className="header">
					<a className="left"  onClick = { this.handleLogin }>LOGIN</a>
					<a className="right" onClick = { this.handleRegister }>SIGNUP</a>
				</div>

				{ this.state.login==='true' ?
				<>
					<div className="form">
						<form className="inputfield">
							<input type='text' placeholder='Email' onChange = { this.handleLoginEmail } />
						</form>
						<form className="inputfield">
							<input type='password' placeholder='Password' onChange = { this.handleLoginPass } />
						</form>					
					</div>
					<div className="btn">
						<button type="submit" onClick = { this.submitLoginData }>
						<IoMdLogIn/>
						{ this.state.systemcall && this.state.name != null ? 
							<Redirect delay={3000} to={{ pathname:"/" , state: { name: this.state.name, token: this.state.token }}} />
							: ''
						}
						</button>
					</div>
				</>
				:
				<>
				<div className="form">
					<form className="inputfield">
						<input type='text' placeholder='Name' onChange = { this.handleRegisterName } />
					</form>
					<form className="inputfield">
						<input type='text' placeholder='Email' onChange = { this.handleLoginEmail }/>
					</form>
					<form className="inputfield">
						<input type='text' placeholder='Password' onChange = { this.handleRegisterPass } />
					</form>										
				</div>
				<div className="btn">
					<button type="submit" onClick={ this.submitRegisterData } >
						<IoMdLogIn />
						{ this.state.systemcall ?
							<Redirect delay = { 3000 } to = {{ pathname: "/" , state: { name: this.state.name, token: this.state.token }}} />
							: ''
						}
					</button>
				</div>
				</>
				}
			</div>
		);
	}
}