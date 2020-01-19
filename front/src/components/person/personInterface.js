import React from 'react';
import Cookies from 'universal-cookie';
import PersonForm from './personForm.js';
import PersonPhonemes from './personPhonemes.js';
import Header from '../header.js';

class PersonInterface extends React.Component {
	constructor(props)
	{
		super(props);
		this.getUser();
		this.getMarkups();
		this.state={ username: "", password: "", name: "", surname: "", markups: {}};
	}

	getMarkups = async () => {
		const cookies = new Cookies();
    	cookies.getAll();
		let response = await fetch('/markups', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: cookies.cookies.username,
			})
		});

		let body = await response.json(); // отправляет запрос с undefined username/password 
		if (body == false)
			alert('Bad data, FILOLUX!');
		else
		{
			let tmp = body.output;
			let result = [];
			for (let i = 0; i < tmp.length; i++)
				result.push({value: tmp[i].id, label: tmp[i].properties.name});
			this.setState({ markups: result });      
		}
	}

	getUser = async () => {
		const cookies = new Cookies();
    	cookies.getAll();
		let response = await fetch('/profile', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: cookies.cookies.username,
				password: cookies.cookies.password,
			})
		});

		let body = await response.json(); // отправляет запрос с undefined username/password 
		if (body == false)
			alert('Bad data, FILOLUX!');
		else
		{
			this.setState({ username: body.username, password: body.password, name: body.name, surname: body.surname })      
		}
	}

	changeMarkup()
	{
		return 0;
	}

	render()
	{
		return (
			<div className="container">
				<Header/>
				<div className="jumbotron" style={{borderRadius: "25px"}}>
		    		<PersonForm state={this.state} />
		    		<div className="row">
		   				<div className="col-md-3"></div>
					    <div className="col-md-8 ">
		    				<PersonPhonemes markups={this.state.markups} />
		    			</div>
		    			<div className="col-md-1"></div>
		    		</div>
		    	</div>
	    	</div>
		);
	}
}

export default PersonInterface;
