import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.onSayHello = () => {
			this.props.sayHello();
		};

		this.onClearForm = (e) => {
			e.preventDefault();
			this.props.clearForm();
		};

		this.onChangeFirst = (el) => {
			this.props.changeFirst(el.target.value);
		};

		this.onChangeLast = (el) => {
			this.props.changeLast(el.target.value);
		};
	};

	render() {
		return(
			<div className="home-page">
				<div>Hello World!</div> 
				<button onClick={this.onSayHello.bind()}>SAY HELLO</button> 

				<form> 
					<input
						placeholder="First"
						value = {this.props.user.first}
						onChange = {this.onChangeFirst.bind(this)} 
						/>
					<input
						placeholder="Last" 
						value = {this.props.user.last}
						onChange = {this.onChangeLast.bind(this)}
						/>

					<button onClick= {this.onClearForm.bind()}>Clear Form</button>  
				</form> 
			</div>
		);
	}
}

//PROPTYPES
HomePage.propTypes = {
	hello: React.PropTypes.bool.isRequired,
	user: React.PropTypes.shape({
		first: React.PropTypes.string.isRequired,
		last: React.PropTypes.string.isRequired
	}).isRequired,
	sayHello: React.PropTypes.func.isRequired,
	clearForm: React.PropTypes.func.isRequired,
	changeLast: React.PropTypes.func.isRequired, 
	changeFirst: React.PropTypes.func.isRequired 
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(HomePage);

