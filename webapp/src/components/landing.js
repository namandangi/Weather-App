import React,{Component} from 'react';
import './landing.css';
import {Link}  from 'react-router-dom';

export default class Landing extends Component{
	state={
		value:'',
		city:''
	}
		 handleChange = async(e)=> {
      //console.dir(e.target.value);
      await this.setState({value:e.target.value});
      console.dir(this.state.value);
   }

   keyPress = async (e)=>{
      if(e.keyCode === 40){
         await this.setState({city:e.target.value});
         console.dir("city is",this.state.city);         
      }
   }
   handleSubmit = async (e)=>{
   	
   	if(e.keyCode===13){
   		e.preventDefault();
   		await this.setState({city:e.target.value});
   		console.dir("city is",this.state.city);
   	}
   }

	render(){
		return(
			<>		
			<div className="container">
			<h1>WEATHER APP</h1>
			<br /><br />
			<form className="searchBar">
				<input className="search" type="text" placeholder="Enter City" onClick={(e)=>{e.preventDefault();}}onSubmit={this.handleSubmit} onKeyDown={this.keyPress} onChange={this.handleChange} value={this.state.value}/>
				<Link to={{pathname:"/weather",state:{city:this.state.value}}}> <button type="submit" style={{visibility:"hidden"}}></button></Link>
			</form>
			</div>
			</>
			);
	}
}