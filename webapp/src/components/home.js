import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';
import { AiOutlineLeft } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
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
import  './home.css';

export default class Home extends Component {
	state = {
		value: '', city: '', data: '', country: '', temp: '',
		weather: '', sunrise: '', sunset: '', maxt: '', mint: '',
		humidity: '', pressure: '', wind: '', date: '', icon: logo
	}
	constructor() {
		super();
		this.iconList = {
			'01d': i01d, '02d': i02d, '03d': i03d, '04d': i04d, '09d': i09d,
			'10d': i10d, '11d': i11d, '13d': i13d, '50d': i50d, '01n': i01n,
			'02n': i02n, '03n': i03n, '04n': i04n, '09n': i09n, '10n': i10n,
			'11n': i11n, '13n': i13n, '50n': i50n
		};
		this.date = new Date();
		this.icon = logo;
	}
	handleChange = (e) => {
      this.setState({value:e.target.value});
   }

	keyPress = (e) => {
		if(e.keyCode === 13) {
			e.preventDefault();
			this.setState({city:e.target.value});
		}
	}
   //handleSubmit is broken
	handleSubmit = (e) => {   	
			if(e.keyCode === 13) {
				e.preventDefault();
				this.setState({ city:e.target.value });
			}
	}
	loadData = async() => {
		if(this.props.location.state !== undefined)
    	this.setState({ city: this.props.location.state.city });
		if(this.state.city !== '') {
			const response = await fetch('/api/weather/search',
				{
					method:'POST',
					body:JSON.stringify({ city: this.props.location.state.city }),
					headers: { 'Content-type': 'application/json' ,
					'Authorization': 'Bearer ' + this.props.location.state.token
				}
			});
		  const content = await response.json();
		  if(content.weather) {
		  if(content.weather[0].icon in this.iconList)
		  	 	this.icon = this.iconList[content.weather[0].icon];
				this.setState({ 
					icon: this.icon, date: this.date.toLocaleString('default',{ weekday: 'long'})+this.date.getDate()+this.date.toLocaleString('default', { month: 'long' }),
					data: content, country: content.sys.country,temp: Math.round(Number(content.main.temp)-273), weather: content.weather[0].main,
					sunrise: new Date(content.sys.sunrise*1000).toUTCString().slice(-11,-7), sunset: new Date(content.sys.sunset*1000).toUTCString().slice(-11,-7),
					maxt: Math.round(Number(content.main.temp_max)-273), mint: Math.round(Number(content.main.temp_min)-273), humidity: content.main.humidity,
					pressure: content.main.pressure, wind: content.wind.speed
				});
			}
		}
	}

	updateData = async(prevProps, prevState) => {
		if(prevState.city != this.state.city) {
			this.props = prevProps;
			const response = await fetch('/api/weather/search',
				{
					method:'POST',
					body:JSON.stringify({ city: this.state.city }),
					 headers: { 'Content-type': 'application/json' ,
					 'Authorization': 'Bearer ' + this.props.location.state.token 
				}
			});
		  let content = await response.json();
		  console.log(content);
		  content = prevState.data != null && content.name !== "Error" ? content: prevState.data;
		  if(content.weather) {
		  if(content.weather[0].icon in this.iconList)
				this.icon = this.iconList[content.weather[0].icon];
				this.setState({ 
					icon: this.icon, date: this.date.toLocaleString('default',{ weekday: 'long'})+" "+this.date.getDate()+" "+this.date.toLocaleString('default', { month: 'long' }),
					data: content, country: content.sys.country,temp: Math.round(Number(content.main.temp)-273), weather: content.weather[0].main,
					sunrise: new Date(content.sys.sunrise*1000).toUTCString().slice(-11,-7), sunset: new Date(content.sys.sunset*1000).toUTCString().slice(-11,-7),
					maxt: Math.round(Number(content.main.temp_max)-273), mint: Math.round(Number(content.main.temp_min)-273), humidity: content.main.humidity,
					pressure: content.main.pressure, wind: content.wind.speed
				});
			}
		}
	}
		
	componentDidMount() {
		this.loadData();
	}
	componentDidUpdate(prevProps,prevState) {
		this.updateData(prevProps,prevState);
	}
	render() {
		return(
			<>
			<div className="nav">
				<div className="bck">
				<Link to={{ pathname:"/", state: { name: this.props.location.state.name, city: this.props.location.state.city, token: this.props.location.state.token }}} >
					<AiOutlineLeft />
				</Link>
				</div>
				<div className="history">
				<Link to={{ pathname: "/history", state: { name: this.props.location.state.name, city: this.state.city, token: this.props.location.state.token }}} >
					<MdHistory />
				</Link>
				</div>
			</div>
			<div className="container">
			<form className="searchBar">
				<AlgoliaPlaces
				placeholder='Write an address here'
				onKeyDown={this.keyPress}
				options={{
					appId: 'pl3TYBGRZOBF',
					apiKey: 'c49c5b63313e3980a6c229d2359136e0',
					type: 'city',
				}} 
				onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>{       	
					this.setState({ city: suggestion.name })
					}}
				/>
				<button type="submit" style={{ visibility: "hidden" }}></button>
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
						<div className="imgbox">
							<img src={this.state.icon} style={{ width: 370, height: 300 }}/>
						</div>
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