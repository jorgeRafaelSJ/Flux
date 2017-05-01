import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';
import * as Flux from '../../flux_sdk';

class Viewport extends Component {
	constructor(props) {
		super(props);
		this.viewport;
		//cache of cells that already have values so we dont request them again
		this.cells_with_values = {};
		this.current_display_count = 0;
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

	updateViewport() {
		let data = [];

		this.props.cells_in_view.forEach((cell, index) => {
			if(this.cells_with_values[cell.id]) {
				data.push(this.cells_with_values[cell.id].value)
			}
		});

		if(FluxViewport.isKnownGeom(data)) {
			this.viewport.setGeometryEntity(data);
		}
	}

	componentDidMount() {
		this.viewport = new FluxViewport(document.querySelector("#view"));
		this.viewport.setupDefaultLighting();
		this.viewport.setGeometryEntity(null);
	}

	componentDidUpdate() {
		if(this.props.cells_in_view.length === 0) {
			this.viewport.setGeometryEntity(null);
			this.current_cell_count = 0;
		} else if(this.props.cells_in_view.length <= this.current_display_count) {
			this.updateViewport();
			this.current_cell_count = this.props.cells_in_view.length;
		} else {
			let allCached = true;
			this.current_display_count++;

			this.props.cells_in_view.forEach((cell)=> {
				if(!(cell.id in this.cells_with_values)) {
					allCached = false;
					this.getValue(this.props.selected_project, cell)
						.then((data) => {
							this.cells_with_values[cell.id] = data;
							this.updateViewport();
						});
				}
			})

			if(allCached) this.updateViewport();
		}
	}
}

// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(Viewport);