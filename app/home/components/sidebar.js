import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../redux';

import * as Flux from '../../flux_sdk';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.dataTables = {};
	}

	selectProject(project, e) {

		this.props.selectProject(project);

		this.getCells(project)
			.then((response) => {
				this.props.setCells(response.entities);
			});
	}	

	getProjectDataTable(project) {
			if(!(project.id in this.dataTables)) {
				let dt = this.props.user.getDataTable(project.id)
				this.dataTables[project.id] = { table: dt, handlers: {}, websocketOpen: false }
			}

			return this.dataTables[project.id];
	}

	getCells(project) {
		return this.getProjectDataTable(project).table.listCells();
	}

	getCell(project, cell) {
		return this.getProjectDataTable(project).table.getCell(cell.id);
	}

	getValue(project, cell) {
		return this.getCell(project, cell).fetch();
	}

	selectDeselectCell(cell, el) {
		if(el.target.checked) {
			this.props.viewCell(cell);
		} else {
			this.props.removeCell(cell);
		}
	}

	render() {

		let selectedProjectCellItems = this.props.selected_project_cells.map((cell, i) => {
			return (
				<div key={cell.id}>
					<input type="checkbox" onClick={this.selectDeselectCell.bind(this, cell)}/>
					<label>{cell.label}</label>
				</div>
			)
		});

		let projectListItems = this.props.projects.map((project, i) => {
			return (
				<div className="project-section" key={project.id}>
					<div
						className="project-title"
						onClick={this.selectProject.bind(this, project)}>
						{project.name}
					</div>
					
					{ this.props.selected_project && project.id === this.props.selected_project.id ?
						<div>{selectedProjectCellItems}</div> : null
					}
				</div>)
		});

		return (
			<div id="sidebar">
				<div id="sidebar-title">Projects:</div>
				<div>{projectListItems}</div>
			</div>
		)
	}
}


// CONNECT TO REDUX AND EXPORT COMPONENT 
const mapStateToProps = (state, ownProps) => state.home;
export default connect(mapStateToProps, actions)(Sidebar);