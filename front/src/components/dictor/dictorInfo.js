import React from 'react';
import Select from 'react-select';
import '../../App.css';

class DictorInfo extends React.Component {  
	constructor(props)
	{
		super(props);

		this.options = [
	      {value:"Д1", label:"Д1"},
	      {value:"Д2", label:"Д2"},
	      {value:"Д3", label:"Д3"},
	      {value:"Акцент", label:"Акцент"}
	    ];
	}
  
	renderSelect()
	{
	    return (
			<Select
				id="dictorDisorders"
				style={{width: '150px'}}
				placeholder="Нет"
				isMulti
				autoFocus
				name="Дефекты"
				options={this.options}
				closeMenuOnSelect={false}
				//value={this.selectedOptions}
				onChange={
				  (selectedOpts) => {this.props.changeSelected(selectedOpts)}
				}
			/>
	    );
	}

	render() {  
		return (
			<div className="col-md-12">
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-md-8">
			            <div className="card flex-md-row mb-4 box-shadow h-md-250">
			                <div className="card-body d-flex flex-column align-items-start">
			                	<div className="inlinediv">
				                  	<div className="inline">
				                  		<p> Описание диктора: </p>
					                  	Псевдоним: <input name="dictorPseudo" onChange={this.props.handleInputChange} type="text"/><br/>
					                  	Имя: <input name="dictorName" onChange={this.props.handleInputChange} type="text"/><br/>
					                  	Город: <input name="dictorCity" onChange={this.props.handleInputChange} type="text"/><br/>
					                </div>
					                <div className="inline">
					                  	Страна: <input name="dictorCountry" onChange={this.props.handleInputChange} type="text"/><br/>
					                  	Родной язык: <input name="dictorLang" onChange={this.props.handleInputChange} type="text"/><br/>
					                  	Пол: <input name="dictorSex" onChange={this.props.handleInputChange} type="text"/><br/>
					                  	Возраст: <input name="dictorAge" onChange={this.props.handleInputChange} type="text"/><br/>
					                </div>
					            </div>
				                Нарушения речи:
			                  	<div id="select">
			                    	{this.renderSelect()}
			                  	</div>
			                  	<button className="btn btn-dark" name="saveDictor" onClick={this.props.saveDictor}>Сохранить</button>
			            	</div>
              			</div>
              		</div>
              		<div className="col-md-2"></div>
              	</div>
            </div>
		);
    }
}

export default DictorInfo;