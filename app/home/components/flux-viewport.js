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

	getValue(project, cell) {
		let dt = this.props.user.getDataTable(project.id);
		return dt.getCell(cell.id).fetch();
	}

	render() {

		return(
			<div id="view"></div>
		)
	}

	componentDidMount() {

		this.viewport = new FluxViewport(document.querySelector("#view"));
		this.viewport.setupDefaultLighting();
		this.viewport.setGeometryEntity(null);
	}

	componentDidUpdate() {
		console.log('new viewport');
		this.props.cells_in_view.forEach((cell)=> {
			this.getValue(this.props.selected_project, cell)
				.then((response) => {
					console.log(response);
				});
		})
	}
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(Viewport);