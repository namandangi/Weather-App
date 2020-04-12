import React,{Component} from 'react';
import  './loginSignUp.css';
import Landing from './landing';
import {Redirect,Link,useHistory} from 'react-router-dom';
import DelayLink from 'react-delay-link';


export default class LoginSignUp extends Component{
state={
	login:'true',
	name:'',
	email:'',
	password:'',
	token:'',
	systemcall:false
}

// async componentDidUpdate(prevProps,prevState){
// 	//console.dir("entered componentDidUpdate",this.state);

// 	if(this.state.login==='true'&&prevState.systemcall!==this.state.systemcall)
// 	{
// 		const response = await fetch('http://localhost:8000/api/weather/login',
// 		{
// 			method:'POST',
// 			body:JSON.stringify({email:this.state.email,password:this.state.password}),
// 			headers: { 'Content-type': 'application/json' }
// 		});
// 		const content = await response.json();
// 		await this.setState({token:content.token});
// 		console.dir(content);	
		
// 	}
// 	else if(this.state.login==='false'&&prevState.systemcall!==this.state.systemcall)
// 	{
// 		const response = await fetch('http://localhost:8000/api/weather/register',
// 		{
// 			method:'POST',
// 			body:JSON.stringify({name:this.state.name,email:this.state.email,password:this.state.password}),
// 			headers: { 'Content-type': 'application/json' }
// 		});
// 		const content = await response.json();
// 		await this.setState({token:content.token});
// 		console.dir(content);
// 	}
// }
// async componentWillUnmount(){
// 	console.log("entered componentWillUnmount",this.state)
// 	if(this.state.login ==='true'&&this.state.systemcall===true)
// 	{
// 		const response =  await fetch('http://localhost:8000/api/weather/login',
// 		{
// 			method:'POST',
// 			body:JSON.stringify({email:this.state.email,password:this.state.password}),
// 			headers: { 'Content-type': 'application/json' }
// 		});
// 		const content = await response.json();
// 		await this.setState({token:content.token});
// 		await console.dir(content);	
// 	}
// 	else if(this.state.login=='false'&&this.state.systemcall=='true')
// 	{
// 		const response = await fetch('http://localhost:8000/api/weather/register',
// 		{
// 			method:'POST',
// 			body:JSON.stringify({name:this.state.name,email:this.state.email,password:this.state.password}),
// 			headers: { 'Content-type': 'application/json' }
// 		});
// 		const content = await response.json();
// 		await this.setState({token:content.token});
// 		console.dir(content);
// 	}
// }
handleLogin = async(e)=>{
e.preventDefault();
this.setState({login:'true'});
}
handleRegister = async(e)=>{
e.preventDefault();
this.setState({login:'false'});
}
handleLoginEmail = async(e)=>{
await this.setState({email:e.target.value});
console.dir(this.state.email);
}
handleLoginPass = async(e)=>{
await this.setState({password:e.target.value});
console.dir(this.state.password);
}
handleRegisterName = async(e)=>{
await this.setState({name:e.target.value});
console.dir(this.state.name);
}
handleRegisterEmail = async(e)=>{
await this.setState({email:e.target.value});
console.dir(this.state.email);
}
handleRegisterPass = async(e)=>{
await this.setState({password:e.target.value});
console.dir(this.state.password);
}
submitLoginData = async(e)=>{
	//let history = useHistory();
	const response = await fetch('http://localhost:8000/api/weather/login',
	{
		method:'POST',
		body:JSON.stringify({email:this.state.email,password:this.state.password}),
		headers: { 'Content-type': 'application/json' }
	});
	const content = await response.json();
	await this.setState({token:content.token,systemcall:true});
	console.dir(this.state);
	// e.preventDefault();
	// console.log("entered submitLoginData")
	// return await this.setState({systemcall:true});
	//history.push('/');
	//console.dir("exiting submitLoginData",this.state)
}
submitRegisterData = async()=>{
	// const response = await fetch('http://localhost:8000/api/weather/register',
	// {
	// 	method:'POST',
	// 	body:JSON.stringify({name:this.state.name,email:this.state.email,password:this.state.password}),
	// 	headers: { 'Content-type': 'application/json' }
	// });
	// const content = await response.json();
	// await this.setState({token:content.token});
	// console.dir(content);
	await this.setState({systemcall:true});
}

	render(){		
		return(
			<>
			<div className="card">
				<div className="header">
					<a className="left" href='#' onClick={this.handleLogin}>LOGIN</a>
					<a className="right" href='#'onClick={this.handleRegister}>SIGNUP</a>
				</div>

{/*				{this.state.login==='true'?<Login />:<Register />}				
				copy pasted the <Login /> and <Register /> code to get the input values				*/}

				{this.state.login==='true'?<><div className="form">
					<form className="inputfield">
						<input type='text' placeholder='Email' onChange={this.handleLoginEmail}/>
					</form>
					<form className="inputfield">
						<input type='text' placeholder='Password' onChange={this.handleLoginPass}/>
					</form>					
			</div>
			{console.dir("systemcall :",this.state.systemcall)}
			<div className="btn"><button type="submit" onClick={this.submitLoginData}>Login-Logo{this.state.systemcall?<Redirect delay={3000} to={{pathname:"/" ,state:{token:this.state.token}}}></Redirect>:''}</button></div></>:<><div className="form">
					<form className="inputfield">
						<input type='text' placeholder='Name' onChange={this.handleRegisterName} />
					</form>
					<form className="inputfield">
						<input type='text' placeholder='Email' onChange={this.handleLoginEmail}/>
					</form>
					<form className="inputfield">
						<input type='text' placeholder='Password' onChange={this.handleRegisterPass}/>
					</form>										
			</div>
			<div className="btn"><Link to={{pathname:'/',state:{token:this.state.token} }}><button type="submit" onClick={this.submitRegisterData}>Register-Logo</button></Link></div>
			</>}
			</div>
			</>
			);
	}
}

function Render(props){
	return(
		<Landing />
		);
}

	// function Register(){
	// 	return(
	// 	<>
	// 		<div className="form">
	// 				<form className="inputfield">
	// 					<input type='text' placeholder='Name' />
	// 				</form>
	// 				<form className="inputfield">
	// 					<input type='text' placeholder='Email' />
	// 				</form>
	// 				<form className="inputfield">
	// 					<input type='text' placeholder='Password' />
	// 				</form>										
	// 		</div>
	// 		<button type="submit">Register-Logo</button>
	// 	</>


	// 		);
	// };
	// function Login(){
	// 	return(
	// 	<>
	// 		<div className="form">
	// 				<form className="inputfield">
	// 					<input type='text' placeholder='Email' />
	// 				</form>
	// 				<form className="inputfield">
	// 					<input type='text' placeholder='Password' />
	// 				</form>					
	// 		</div>
	// 		<button type="submit">Login-Logo</button>
	// 	</>
	// 		);
	// };
