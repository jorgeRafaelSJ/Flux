import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';
import * as Flux from '../../flux_sdk';

class HomePage extends Component {
	constructor(props) {
		super(props);

	};

	fluxLogin() {
		Flux.helpers.redirectToFluxLogin();
	}

	fluxLogout() {
		//need to figure out how to end session with flux
		this.props.setLoginButtonState(false);
	}

	componentWillMount() {
		Flux.helpers.storeFluxUser()
			.then(() => {
				return Flux.helpers.isLoggedIn()
			})
			.then((isLoggedIn) => {
				if(!isLoggedIn){
					console.log('here');
					this.props.setLoginButtonState(true);
				} else {
					this.props.setLoginButtonState(false);
				}
			})
	}
	render() {
		return(
			<div className="home-page">
				{	this.props.showLogin ? 
					<button onClick={this.fluxLogin.bind()}>LOGIN</button> : 
					<button onClick={this.fluxLogout.bind()}>LOG OUT</button> }
			</div>
		);
	}
}

//PROPTYPES
// HomePage.propTypes = {
// 	hello: React.PropTypes.bool.isRequired,
// 	user: React.PropTypes.shape({
// 		first: React.PropTypes.string.isRequired,
// 		last: React.PropTypes.string.isRequired
// 	}).isRequired,
// 	sayHello: React.PropTypes.func.isRequired,
// 	clearForm: React.PropTypes.func.isRequired,
// 	changeLast: React.PropTypes.func.isRequired, 
// 	changeFirst: React.PropTypes.func.isRequired 
// }

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(HomePage);

