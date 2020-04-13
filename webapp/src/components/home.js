import React,{Component} from 'react';
import  './home.css';
import logo from '../logo.svg';
import i01d from './icons/i01d.png';
import i02d from './icons/i02d.png';
import i03d from './icons/i03d.png';
import i04d from './icons/i04d.png';
import i09d from './icons/i09d.png';
import i10d from './icons/i10d.png';
import i11d from './icons/i11d.png';
import i13d from './icons/i13d.png';
import i50d from './icons/i50d.png';
import i01n from './icons/i01n.png';
import i02n from './icons/i02n.png';
import i03n from './icons/i03n.png';
import i04n from './icons/i04n.png';
import i09n from './icons/i09n.png';
import i10n from './icons/i10n.png';
import i11n from './icons/i11n.png';
import i13n from './icons/i13n.png';
import i50n from './icons/i50n.png';

import {Link} from 'react-router-dom';
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai';
import {MdHistory} from 'react-icons/md';
import AlgoliaPlaces from 'algolia-places-react';

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
		date: '',
		icon:logo
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
    var icons= {
		'01d':i01d,'02d':i02d,'03d':i03d,'04d':i04d,'09d':i09d,'10d':i10d,'11d':i11d,'13d':i13d,'50d':i50d,'01n':i01n,'02n':i02n,'03n':i03n,'04n':i04n,'09n':i09n,'10n':i10n,'11n':i11n,'13n':i13n,'50n':i50n
	}
    if(this.props.location.state!==undefined)
    await this.setState({city:this.props.location.state.city});
		console.dir(this.props.location.state)
		if(this.state.city!==''){
			const response = await fetch('http://localhost:8000/api/weather/search',
				{
					method:'POST',
					body:JSON.stringify({city:this.props.location.state.city}),
					 headers: { 'Content-type': 'application/json' ,
					 'Authorization': 'Bearer ' + this.props.location.state.token}
				});
		  const content = await response.json();
		  if(content!=null){
		  console.dir(response,content);
		  let date = new Date();
		  let month = date.toLocaleString('default',{month:'long'});
		  let day = date.toLocaleString('default',{weekday:'long'});
		  let currdate = date.getDate();
		  let tempDate = day+' '+currdate+' '+month;
		  let temp_temp = await Math.round(Number(content.main.temp)-273);
		  let temp_min = await Math.round(Number(content.main.temp_min)-273);
		  let temp_max = await Math.round(Number(content.main.temp_max)-273);
		  let temp_humidty = content.main.humidity;
		  let temp_wind = content.wind.speed;
		  let temp_pressure = content.main.pressure;
		  let temp_weather = content.weather[0].main;
		  let temp_sunrise = await new Date(content.sys.sunrise*1000).toUTCString().slice(-11,-7);
		  let temp_sunset = await new Date(content.sys.sunset*1000).toUTCString().slice(-11,-7); 
		  let icon;
		  if(content.weather[0].icon in icons)
		  	 icon = icons[content.weather[0].icon]
		  await this.setState({icon:icon,date:tempDate,data:content,country:content.sys.country,temp:temp_temp,weather:temp_weather,sunrise:temp_sunrise,sunset:temp_sunset,maxt:temp_max,mint:temp_min,humidity:temp_humidty,pressure:temp_pressure,wind:temp_wind});
		  console.dir(this.state)
		}
		 // console.dir(response,content,this.state.data.main);
		 //console.dir(history);
		}
	}
	async componentDidUpdate(prevProps,prevState){
		var icons= {
		'01d':i01d,'02d':i02d,'03d':i03d,'04d':i04d,'09d':i09d,'10d':i10d,'11d':i11d,'13d':i13d,'50d':i50d,'01n':i01n,'02n':i02n,'03n':i03n,'04n':i04n,'09n':i09n,'10n':i10n,'11n':i11n,'13n':i13n,'50n':i50n
	}
		if(prevState.city!=this.state.city){
			this.props = prevProps;
			console.dir(this.props);
			const response = await fetch('http://localhost:8000/api/weather/search',
				{
					method:'POST',
					body:JSON.stringify({city:this.state.city}),
					 headers: { 'Content-type': 'application/json' ,
					 'Authorization': 'Bearer ' + this.props.location.state.token}
				});
		  let content = await response.json();
		  content = content.name!=="Error"?content:prevState.data;
		  console.dir(content.name,prevState.data)
		  let date = new Date();
		  let month = date.toLocaleString('default',{month:'long'});
		  let day = date.toLocaleString('default',{weekday:'long'});
		  let currdate = date.getDate();
		  let tempDate = day+' '+currdate+' '+month;
		  let temp_temp = await Math.round(Number(content.main.temp)-273);
		  let temp_min = await Math.round(Number(content.main.temp_min)-273);
		  let temp_max = await Math.round(Number(content.main.temp_max)-273);
		  let temp_humidty = content.main.humidity;
		  let temp_wind = content.wind.speed;
		  let temp_pressure = content.main.pressure;
		  let temp_weather = content.weather[0].main;
		  let temp_sunrise = await new Date(content.sys.sunrise*1000).toUTCString().slice(-11,-7);
		  let temp_sunset = await new Date(content.sys.sunset*1000).toUTCString().slice(-11,-7); 
		  let icon;
		  if(content.weather[0].icon in icons)
		  	 icon = icons[content.weather[0].icon]
		  await this.setState({icon:icon,date:tempDate,data:content,country:content.sys.country,temp:temp_temp,weather:temp_weather,sunrise:temp_sunrise,sunset:temp_sunset,maxt:temp_max,mint:temp_min,humidity:temp_humidty,pressure:temp_pressure,wind:temp_wind});
		  //console.dir(this.state,history);	
		}
	}
	render(){
		return(
			<>
			<Link to={{pathname:"/",state:{name:this.props.location.state.name,city:this.props.location.state.city,token:this.props.location.state.token}}} ><a id="bck" > <AiOutlineLeft /> </a></Link>
			<Link to={{pathname:"/history",state:{name:this.props.location.state.name,city:this.state.city,token:this.props.location.state.token}}} ><a id="history" > <MdHistory /> </a></Link>
			<br /><br />
			<div className="container">
			<form className="searchBar">
{/*				<input 	className="search" type="text" placeholder="Enter City" onClick={(e)=>{e.preventDefault();}} onSubmit={this.handleSubmit} onKeyDown={this.keyPress} onChange={this.handleChange} value={this.state.value}/>		*/}
	<AlgoliaPlaces
      placeholder='Write an address here'
      onKeyDown={this.keyPress}
 
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
				<button type="submit" style={{visibility:"hidden"}}></button>
			</form>
			<div className="infoCard">
				<div className="upperCard">
					<h2>{this.state.data.name} , {this.state.country}</h2>
					<h4>
						{this.state.date}
					</h4>
				</div>
				<div className="data">
				<div className="bottomLeft">
					<div className="imgbox"><img src={this.state.icon} style={{width:370,height:300}}/></div>
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