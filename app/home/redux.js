import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';


/* ============================================================================
REDUCER INIT VALUE
============================================================================= */

const init = {
	showLogin: true,
	user: null,
	projects: null, 
};

/* ============================================================================
ACTIONS CONSTANTS
============================================================================= */

const SET_LOGIN_BUTTON_STATE = 'home/SET_LOGIN_BUTTON_STATE';
const SET_USER = 'home/SET_USER';
const SET_PROJECTS = 'home/SET_PROJECTS';
const SET_INIT_STATE = 'home/SET_INIT_STATE';

/* ============================================================================
ACTIONS - ACTION CREATORS
============================================================================= */

export const setLoginButtonState = createAction(SET_LOGIN_BUTTON_STATE, (bool) => ({bool}));

export const setUser = createAction(SET_USER, (user) => ({user}));

export const setProjects = createAction(SET_PROJECTS, (projects) => ({projects}));

export const setInitState = createAction(SET_INIT_STATE);

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
}, init);