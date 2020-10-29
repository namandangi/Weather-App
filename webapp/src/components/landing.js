import React,{ Component } from 'react';
import { Link }  from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';
import '../styles/landing.css';

export default class Landing extends Component {
	state = {
		value: '',
		city: '',
		token: '',
		name: '',
		loggedin: false
	}
	 componentDidMount() {
		if(this.props.location.state != null) {
			this.setState({ loggedin:true, name:this.props.location.state.name, token:this.props.location.state.token });
		}
	}
	componentDidUpdate = (prevProps,prevState) => {

	}
	handleChange = (e) => {
       this.setState({ value: e.target.value });
   }
	keyPress = (e) => {
		if(e.keyCode === 40){
			this.setState({ city: e.target.value });
		}
	}
	handleSubmit = (e) => {
		if(e.keyCode === 13)
		{
			e.preventDefault();
			this.setState({ city: e.target.value });
		}
	}
	handleLogout= (e) => {
		this.setState({ token: '', name: '', loggedin: false });
	}

	render(){
		return(
			<>		
				<div className="Navbar">
					{ this.state.name==''?
						<Link to='/login'>
							Login | Register
						</Link>
						:
						<>
							<h3>Logged in as {this.state.name} | </h3>
							<h3 id="logout" onClick={ this.handleLogout }>
								&nbsp;Logout
							</h3>
						</>
					}
				</div>			
				<div className="Container">
				<h1>WEATHER APP</h1>
				<br /><br />
				<form className="searchBar">
					<AlgoliaPlaces
					placeholder='Write an address here'
					onSubmit={ this.handleSubmit }
					options={{
						appId: 'pl3TYBGRZOBF',
						apiKey: 'c49c5b63313e3980a6c229d2359136e0',
						type: 'city',
					}}
					onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>{       	
						this.setState({ city:suggestion.name })
						}}
					/>
				{ this.state.loggedin?
					<Link to={{ pathname:"/weather",state:{ name: this.state.name, city: this.state.city, token: this.state.token }}}> 
						<button type="submit" style={{ visibility: "hidden" }} />
					</Link>
					:
					<Link to='/'>
						<button type="submit" style={{ visibility: "hidden" }} />
					</Link>
				}
				</form>
				</div>
			</>
			);
	}
}