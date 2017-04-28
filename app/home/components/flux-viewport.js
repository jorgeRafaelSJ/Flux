import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';
import * as Flux from '../../flux_sdk';

class Viewport extends Component {
	constructor(props) {
		super(props);
		this.viewport;
	};



	render() {

		return(
			<div>	
				<div id="view"></div>
			</div>
		)
	}

	componentDidMount() {

		let box_data = [
		  {
		    "dimensions": [
		      2,
		      2,
		      2
		    ],
		    "origin": [
		      0,
		      0,
		      0
		    ],
		    "primitive": "block",
		    "units": {
		      "dimensions": "meters",
		      "origin": "meters"
		    }
		  }
		];

		this.viewport = new FluxViewport(document.querySelector("#view"));
		this.viewport.setupDefaultLighting();
		this.viewport.setGeometryEntity(box_data);
		console.log(this.viewport.running);
	}
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(Viewport);