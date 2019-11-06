import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

class PersonForm extends React.Component {  
	constructor(props) {
		super(props);
	}

	render() {  
		return (
			<div className="d-flex justify-content-center h-100">
		        <div className="card-body">
					<div className="input-group form-group">
		              	<div className="input-group-prepend">
		                	<span className="input-group-text"><i className="fa fa-user"></i></span>
		              	</div>
		      			<input name="name" type="text" className="form-control" onChange={this.props.handleInputChange} value={this.props.state.name} />
		    		</div>
		    		<div className="input-group form-group">
		              	<div className="input-group-prepend">
		                	<span className="input-group-text"><i className="fa fa-user"></i></span>
		              	</div>
		      			<input name="surname" type="text" className="form-control" onChange={this.props.handleInputChange} value={this.props.state.surname} />
		    		</div>
		            <div className="input-group form-group">
		              	<div className="input-group-prepend">
		                	<span className="input-group-text"><i className="fa fa-user"></i></span>
		              	</div>
		      			<input name="username" type="text" className="form-control" onChange={this.props.handleInputChange} value={this.props.state.username} />
		    		</div>
		        	<div className="input-group form-group">
		          		<div className="input-group-prepend">
		            		<span className="input-group-text"><i className="fa fa-key"></i></span>
		          		</div>
		          		<input name="password" type="password" className="form-control" onChange={this.props.handleInputChange} value={this.props.state.password} />
		        	</div>
		        	<div className="form-group">
		          		<button onClick={this.reset} className="btn float-right login_btn">Reset (not yet)</button>
		          		<a href="/">Home</a>
		       		</div>
		      	</div>
		    </div>
		);
    }
}

export default PersonForm;




