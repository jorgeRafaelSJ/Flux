import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';

import * as Flux from '../../flux_sdk';
import Viewport from './flux-viewport.js';

class HomePage extends Component {
	constructor(props) {
		super(props);
	};

	fluxLogin() {
		Flux.helpers.redirectToFluxLogin();
	}

	fluxLogout() {
		delete window.localStorage['__FLUX__'];
		this.props.setInitState();
	}

	componentWillMount() {
		Flux.helpers.storeFluxUser()
			.then(() => {
				return Flux.helpers.isLoggedIn()
			})
			.then((isLoggedIn) => {
				if(!isLoggedIn){
					this.props.setLoginButtonState(true);
				} else {
					this.props.setLoginButtonState(false);
					//if is loggedin set user 
					this.props.setUser(Flux.helpers.getUser());
					//get the user's projects then set them to state
					this.props.user.listProjects()
						.then((response) => {
							this.props.setProjects(response.entities);
						});
				}
			})
	}

	render() {

		let loginLogout = this.props.showLogin ? 
					<button className="login-logout-btn" 
					onClick={this.fluxLogin.bind(this)}>Login</button> : 
					<button className="login-logout-btn" 
					onClick={this.fluxLogout.bind(this)}>Log Out</button>;

		let viewport = this.props.showLogin ? null : <Viewport></Viewport>;

		return(
			<div className="home-page">
				
				<div className="nav">
					<div className="nav-btn-wrapper"> 
						{ loginLogout }
					</div>
				</div>

				{viewport}
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

