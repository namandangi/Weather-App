import React,{Component} from 'react';
import Home from './home';
import Landing from './landing';
import LoginSignUp from './loginSignUp';
import History from './history';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link  
} from "react-router-dom";

export default class Index extends Component{
	render(){
		return(
			<>
			<Router>
			<Switch>                
				<Route exact path="/" component={Landing}></Route>
				<Route exact path="/login" component={LoginSignUp}></Route>
				<Route exact path="/weather" component={Home}></Route>
				<Route exact path="/history" component={History}></Route>
			</Switch>
			</Router>
			</>
			);
	}
}