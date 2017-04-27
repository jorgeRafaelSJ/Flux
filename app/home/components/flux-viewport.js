import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';
import * as Flux from '../../flux_sdk';

class FluxViewport extends Component {
	constructor(props) {
		super(props);
	};

	render() {
		return(
			<div id='viewport'></div>
		)
	}
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(FluxViewport);