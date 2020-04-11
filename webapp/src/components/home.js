import React,{Component} from 'react';
import home from './home.css';
import logo from '../logo.svg';

import {Link} from 'react-router-dom';
import {AiOutlineLeft} from 'react-icons/ai';

export default class Home extends Component{
	state={
		value:'',
		city:'',
		data:'',
		country:'',
		temp:'',
		weather:'',
		sunrise:'',
		sunset:'',
		maxt:'',
		mint:'',
		humidity:'',
		pressure:'',
		wind:'',
		date: new Date().toLocaleString()
	}

	 handleChange = async(e)=> {
      //console.dir(e.target.value);
      await this.setState({value:e.target.value});
      console.dir(this.state.value);
   }

   keyPress = async (e)=>{
      if(e.keyCode === 13){
      	e.preventDefault();
         await this.setState({city:e.target.value});
         console.dir("city is",this.state.city);         
      }
   }
   //handleSubmit doesnt do anything
   handleSubmit = async (e)=>{   	
   	if(e.keyCode === 13){
   		e.preventDefault();
   		await this.setState({city:e.target.value});
   		console.dir("city is",this.state.city);
   	}
   }
		
	async componentWillMount(){
	
    //  navigator.geolocation.getCurrentPosition(
    //   function(position) {
    //     console.dir("position :",position);
    //   },
    //   function(error) {
    //     console.dir("Error Code = " + error.code + " - " + error.message);
    //   }
    // );
    //console.dir(this.props.location.state.city)		
    if(this.props.location.state!==undefined)
    await this.setState({city:this.props.location.state.city});
		console.dir(this.state)
		if(this.state.city!==''){
			const response = await fetch('http://localhost:8000/api/weather/search',
				{
					method:'POST',
					body:JSON.stringify({city:this.state.city}),
					 headers: { 'Content-type': 'application/json' }
				});
		  const content = await response.json();
		  let temp_temp = await Math.round(Number(content.main.temp)-273);
		  let temp_min = await Math.round(Number(content.main.temp_min)-273);
		  let temp_max = await Math.round(Number(content.main.temp_max)-273);
		  let temp_humidty = content.main.humidity;
		  let temp_wind = content.wind.speed;
		  let temp_pressure = content.main.pressure;
		  let temp_weather = content.weather[0].main;
		  let temp_sunrise = await new Date(content.sys.sunrise*1000).toUTCString().slice(-11,-7);
		  let temp_sunset = await new Date(content.sys.sunset*1000).toUTCString().slice(-11,-7); 
		  await this.setState({data:content,country:content.sys.country,temp:temp_temp,weather:temp_weather,sunrise:temp_sunrise,sunset:temp_sunset,maxt:temp_max,mint:temp_min,humidity:temp_humidty,pressure:temp_pressure,wind:temp_wind});
		 // console.dir(response,content,this.state.data.main);
		}
	}
	async componentDidUpdate(prevProps,prevState){
		if(prevState.city!=this.state.city){
			this.props = prevProps;
			const response = await fetch('http://localhost:8000/api/weather/search',
				{
					method:'POST',
					body:JSON.stringify({city:this.state.city}),
					 headers: { 'Content-type': 'application/json' }
				});
		  let content = await response.json();
		  content = content.name!=="Error"?content:prevState.data;
		  console.dir(content.name,prevState.data)
		  let temp_temp = await Math.round(Number(content.main.temp)-273);
		  let temp_min = await Math.round(Number(content.main.temp_min)-273);
		  let temp_max = await Math.round(Number(content.main.temp_max)-273);
		  let temp_humidty = content.main.humidity;
		  let temp_wind = content.wind.speed;
		  let temp_pressure = content.main.pressure;
		  let temp_weather = content.weather[0].main;
		  let temp_sunrise = await new Date(content.sys.sunrise*1000).toUTCString().slice(-11,-7);
		  let temp_sunset = await new Date(content.sys.sunset*1000).toUTCString().slice(-11,-7); 
		  await this.setState({data:content,country:content.sys.country,temp:temp_temp,weather:temp_weather,sunrise:temp_sunrise,sunset:temp_sunset,maxt:temp_max,mint:temp_min,humidity:temp_humidty,pressure:temp_pressure,wind:temp_wind});
		  console.dir(this.state,this.state.data);	
		}
	}
	render(){
		return(
			<>
			<Link to="/"><a href="#"> <AiOutlineLeft /> </a></Link>
			<br /><br />
			<div className="container">
			<form className="searchBar">
				<input 	className="search" type="text" placeholder="Enter City" onClick={(e)=>{e.preventDefault();}} onSubmit={this.handleSubmit} onKeyDown={this.keyPress} onChange={this.handleChange} value={this.state.value}/>
				<button type="submit" style={{visibility:"hidden"}}></button>
			</form>
			<div className="infoCard">
				<div className="upperCard">
					<h2>{this.state.data.name} , {this.state.country}</h2>
					<h4>Friday 10 April
						{this.state.date}
					</h4>
				</div>
				<div className="data">
				<div className="bottomLeft">
					<div className="imgbox"><img src={logo} style={{width:370,height:300}}/></div>
					<div className="infoText">
						<h3>{this.state.temp}°</h3>
						<h4>{this.state.weather}</h4>
					</div>
				</div>
				<div className="bottomRight">
					<div className="singleCell">
						<h4>{this.state.maxt} °</h4>
						<span>HIGH</span>
					</div>
					<div className="singleCell">
						<h4>{this.state.humidity} %</h4>
						<span>HUMIDITY</span>
					</div>
					<div className="singleCell">
						<h4>{this.state.sunrise} am</h4>
						<span>SUNRISE</span>
					</div>
					<div className="singleCell">
						<h4>{this.state.mint} °</h4>
						<span>LOW</span>
					</div>
					<div className="singleCell">
						<h4>{this.state.wind} mph</h4>
						<span>WIND</span>
					</div>
					<div className="singleCell">
						<h4>{this.state.sunset} pm</h4>
						<span>SUNSET</span>
					</div>
				</div>
				</div>
			</div>
			</div>
			</>
			);
	}
}