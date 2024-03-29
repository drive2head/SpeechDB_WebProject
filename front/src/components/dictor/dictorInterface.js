import React from 'react';
import Header from '../header.js';
import axios from "axios";
import Cookies from 'universal-cookie';
import DictorInfo from './dictorInfo.js';

let entity = require("./../../model.js")

class DictorInterface extends React.Component {  
	constructor(props) {
		super(props);
		this.state = {  
			dictorName: "",
			dictorLang: "",
			dictorCity: "",
			dictorSex: "",
			dictorAge: "",
			dictorCountry: "",
			selectedOptions: [],
			dictorPseudo: "",
	    };
	}

	saveDictor()
	{
		let dictor = entity.Person(this.state.dictorName, this.state.dictorAge, this.state.dictorSex, this.state.dictorLang, this.state.dictorCity, this.state.dictorCountry, this.state.selectedOptions);
		//console.log(dictor);
		const cookies = new Cookies();
    	cookies.getAll();
		axios.post('/add_person', {
			username: cookies.cookies.username,
			person: dictor,
			pseudonym: this.state.dictorPseudo,
		});
		window.location.href = "/";
	}

  	changeLang(selectedOpts) {this.setState({dictorLang: selectedOpts});}
  	changeCountry(selectedOpts) {this.setState({dictorCountry: selectedOpts});}
	handleInputChange(event) {this.setState({[event.target.name]: event.target.value});}
  	changeSelected(selectedOpts) {this.setState({selectedOptions: selectedOpts});}

	render() {  
		document.title = "Новый интерфейс";
		return (
			<div className="container-fluid">
				<Header/>
				<div className="jumbotron bg-dark" style={{borderRadius: "25px"}}>
					<div className="row">
						<DictorInfo
							handleInputChange={this.handleInputChange.bind(this)}
							changeCountry={this.changeCountry.bind(this)}
							changeLang={this.changeLang.bind(this)}
							changeSelected={this.changeSelected.bind(this)}
							saveDictor={this.saveDictor.bind(this)}
						/>
					</div>
				</div>
		    </div>
		);
    }
}

export default DictorInterface;