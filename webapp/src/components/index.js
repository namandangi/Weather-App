import React,{Component} from 'react';
import Home from './home';
import Landing from './landing';

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
                <Route exact path="/weather" component={Home}></Route>
				<Route exact path="/" component={Landing}></Route>
			</Switch>
			</Router>
			</>
			);
	}
}