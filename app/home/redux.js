import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';


/* ============================================================================
REDUCER INIT VALUE
============================================================================= */

const init = {
	showLogin: true,
	user: null,
	projects: null, 
	selected_project: null, 
	selected_project_cells: [],
	cells_in_view: [],
};

/* ============================================================================
ACTIONS CONSTANTS
============================================================================= */

const SET_LOGIN_BUTTON_STATE = 'home/SET_LOGIN_BUTTON_STATE';
const SET_USER = 'home/SET_USER';
const SET_PROJECTS = 'home/SET_PROJECTS';
const SET_INIT_STATE = 'home/SET_INIT_STATE';
const SELECT_PROJECT = 'home/SELECT_PROJECT';
const SET_CELLS = 'home/SET_CELLS';
const VIEW_CELL = 'home/VIEW_CELL';
const REMOVE_CELL = 'home/REMOVE_CELL';

/* ============================================================================
ACTIONS - ACTION CREATORS
============================================================================= */

export const setLoginButtonState = createAction(SET_LOGIN_BUTTON_STATE, (bool) => ({bool}));

export const setUser = createAction(SET_USER, (user) => ({user}));

export const setProjects = createAction(SET_PROJECTS, (projects) => ({projects}));

export const selectProject = createAction(SELECT_PROJECT, (selected_project) => ({selected_project}));

export const setInitState = createAction(SET_INIT_STATE);

export const setCells = createAction(SET_CELLS, (cells) => ({cells}));

export const viewCell = createAction(VIEW_CELL, (cell) => ({cell}));

export const removeCell = createAction(REMOVE_CELL, (cell) => ({cell}));

/* ============================================================================
REDUCER --- ACTION HANDLER
============================================================================= */

export default handleActions({
	[SET_INIT_STATE]: (state) => {return init},
	[SET_LOGIN_BUTTON_STATE]: (state, action) => {
		return {
			...state, 
			showLogin: action.payload.bool,
		}
	},
	[SET_USER]: (state, action) => {
		return {
			...state, 
			user: action.payload.user,
		}
	}, 
	[SET_PROJECTS]: (state, action) => {
		return {
			...state, 
			projects: action.payload.projects,
		}
	},
	[SELECT_PROJECT]: (state, action) => {
		return {
			...state, 
			selected_project_cells: [],
			selected_project: action.payload.selected_project,
		}
	},
	[SET_CELLS]: (state, action) => {
		return {
			...state,
			selected_project_cells: action.payload.cells,
		}
	},
	[VIEW_CELL]: (state, action) => {
		let cellsArray = [...state.cells_in_view];
		cellsArray.push(action.payload.cell);

		return {
			...state, 
			cells_in_view: cellsArray
		}
	},
	[REMOVE_CELL]: (state, action) => {
		let cellsArray = [...state.cells_in_view];
		let newCellsArray = cellsArray.filter((cell) => { return cell.id !== action.payload.cell.id });

		return {
			...state, 
			cells_in_view: newCellsArray
		}
	}
}, init);