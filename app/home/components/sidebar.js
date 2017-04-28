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

	viewCell(cell, el) {
		this.props.viewCell(cell);
	}

	render() {

		let selectedProjectCellItems = this.props.selected_project_cells.map((cell, i) => {
			return (
				<li key={cell.id}
					onClick={this.viewCell.bind(this, cell)}>
					{cell.label}
				</li>
			)
		});

		let projectListItems = this.props.projects.map((project, i) => {
			return (
				<div className="project-section">
					<div
						className="project-title"
						onClick={this.selectProject.bind(this, project)}
						key={project.id}>
						{project.name}
					</div>
					
					{ this.props.selected_project && project.id === this.props.selected_project.id ?
						<ul>{selectedProjectCellItems}</ul> : null
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