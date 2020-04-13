import React,{Component} from 'react';
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
import {AiOutlineLeft} from 'react-icons/ai';

export default class History extends Component{
	state={
			token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTkzNWE5NTgwYWVkOTVkMDM2NmM5OWIiLCJpYXQiOjE1ODY3MTUyODUsImV4cCI6MTYxODI1MTI4NX0.Q9ETx8QjI865DOwUI4bq3cN8UNaIdjYiq6ohDvNaifk',
			data:[],
			icon:[]
		}
		async componentWillMount(){
	var icons= {
		'01d':i01d,'02d':i02d,'03d':i03d,'04d':i04d,'09d':i09d,'10d':i10d,'11d':i11d,'13d':i13d,'50d':i50d,'01n':i01n,'02n':i02n,'03n':i03n,'04n':i04n,'09n':i09n,'10n':i10n,'11n':i11n,'13n':i13n,'50n':i50n
	}
			const response = await fetch('http://localhost:8000/api/weather/history',{
				method:'GET',
				headers: { 'Content-type': 'application/json' ,
					 'Authorization': 'Bearer ' + this.props.location.state.token}
			})	;
			const content = await response.json();
			let tempdata = []
			let tempicon = []
			content.map((el,id)=>{
				tempdata[id] = el;
				tempicon[id] = icons[el.weather[0].icon]||logo;
			})
			await this.setState({data:tempdata,icon:tempicon});
			console.dir(this.state)
		}
	render(){		
		return(
			<>
			<div id="back" style={{width:'0'}}><Link to={{pathname:"/weather",state:{name:this.props.location.state.name,city:this.props.location.state.city,token:this.props.location.state.token}}} ><a > <AiOutlineLeft /> </a></Link></div>
			<br /><br />
			{this.state.data.map((el,id)=>
			<div className="container">
			<div className="infoCard">
				<div className="upperCard">
					<h2>{el.name} , {el.sys.country}</h2>
					<h4>
						{el.searchedAt}
					</h4>
				</div>
				<div className="data">
					<div className="bottomLeft">
						<div className="imgbox"><img src={this.state.icon[id]} style={{width:370,height:300}}/></div>
						<div className="infoText">
							<h3>{Math.round(Number(el.main.temp-273))}°</h3>
							<h4>{el.weather[0].main}</h4>
						</div>
					</div>
					<div className="bottomRight">
						<div className="singleCell">
							<h4>{Math.round(Number(el.main.temp_max-273))} °</h4>
							<span>HIGH</span>
						</div>
						<div className="singleCell">
							<h4>{el.main.humidity} %</h4>
							<span>HUMIDITY</span>
						</div>
						<div className="singleCell">
							<h4>{new Date(el.sys.sunrise*1000).toUTCString().slice(-11,-7)} am</h4>
							<span>SUNRISE</span>
						</div>
						<div className="singleCell">
							<h4>{Math.round(Number(el.main.temp_min-273))} °</h4>
							<span>LOW</span>
						</div>
						<div className="singleCell">
							<h4>{el.wind.speed} mph</h4>
							<span>WIND</span>
						</div>
						<div className="singleCell">
							<h4>{new Date(el.sys.sunset*1000).toUTCString().slice(-11,-7)} pm</h4>
							<span>SUNSET</span>
						</div>
					</div>
				</div>
			</div>
			</div>
		)};
			</>
			);
	}
}