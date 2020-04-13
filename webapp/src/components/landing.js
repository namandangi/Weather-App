import React,{Component} from 'react';
import './landing.css';
import {Link}  from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';

export default class Landing extends Component{
	state={
		value:'',
		city:'',
		token:'',
		name:'',
		loggedin:false
	}
	async componentDidMount(){
		console.dir(this.props,this.state.loggedin);
		if(this.props.location.state!=null){
			await this.setState({loggedin:true,name:this.props.location.state.name,token:this.props.location.state.token});
			console.dir("token is : ",this.props.location.state.token);
		}
	}
		 handleChange = async(e)=> {
      //console.dir(e.target.value);
      await this.setState({value:e.target.value});
      console.dir(this.state.value);
   }
   componentDidUpdate = async(prevProps,prevState)=>{

   }
 // static async getDerivedStateFromProps(props,state){
 //   		// await this.setState({token:this.props.location.state.token});
 //   		console.dir("token is : ",props.location.state.token);
 //   		return{token:props.location.state.token};
		
 //   }

   keyPress = async (e)=>{
      if(e.keyCode === 40){
         await this.setState({city:e.target.value});
         console.dir("city is",this.state.city);         
      }
   }
   handleSubmit = async (e)=>{
   	
   	if(e.keyCode===13)
   	{
   		e.preventDefault();
   		await this.setState({city:e.target.value});
   		console.dir("city is",this.state.city);
   	}
   }
   handleLogout= async(e)=>{
   	await this.setState({token:'',name:'',loggedin:false});
   	console.dir("logged out",this.state.loggedin);
   }

	render(){
		return(
			<>		
			<div className="Navbar">{this.state.name==''?<Link to='/login'><a href="#">Login | Register</a></Link>:<><h3>Logged in as {this.state.name} | </h3><h3 id="logout" onClick={this.handleLogout}>&nbsp;Logout</h3></>}</div>			
			<div className="Container">
			<h1>WEATHER APP</h1>
			<br /><br />
			<form className="searchBar">
			{console.dir(this.state.loggedin)}
				{/* <input className="search" type="text" placeholder="Enter City" onClick={(e)=>{e.preventDefault();}}onSubmit={this.handleSubmit} onKeyDown={this.keyPress} onChange={this.handleChange} />	*/}
	<AlgoliaPlaces
      placeholder='Write an address here'
      onSubmit={this.handleSubmit}
 
      options={{
        appId: 'pl3TYBGRZOBF',
        apiKey: 'c49c5b63313e3980a6c229d2359136e0',
        type: 'city',
        // Other options from https://community.algolia.com/places/documentation.html#options
      }}
 
      onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>{       	
        this.setState({city:suggestion.name})
        console.dir('Fired when suggestion selected in the dropdown or hint was validated.',suggestion.name,this.state.city)}}
 
      onSuggestions={({ rawAnswer, query, suggestions }) => 
        console.dir('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}
 
      onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
        console.dir('Fired when arrows keys are used to navigate suggestions.')}
 
      onClear={() => 
        console.dir('Fired when the input is cleared.')}
 
      onLimit={({ message }) => 
        console.dir('Fired when you reached your current rate limit.')}
 
      onError={({ message }) => 
        console.dir('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
    />
				{this.state.loggedin?<Link to={{pathname:"/weather",state:{name:this.state.name,city:this.state.city,token:this.state.token}}}> <button type="submit" style={{visibility:"hidden"}}></button></Link>:<Link to='/'> <button type="submit" style={{visibility:"hidden"}}></button></Link>}
			</form>
			</div>
			</>
			);
	}
}