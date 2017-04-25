import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';


/* ============================================================================
REDUCER INIT VALUE
============================================================================= */

const init = {
	user: {
		first: '',
		last: ''
	},
	hello: false
};

/* ============================================================================
ACTIONS CONSTANTS
============================================================================= */

const SAY_HELLO = 'home/SAY_HELLO';
const CLEAR_FORM = 'home/CLEAR_FORM';
const CHANGE_FIRST = 'home/CHANGE_FIRST';
const CHANGE_LAST = 'home/CHANGE_LAST';

/* ============================================================================
ACTIONS - ACTION CREATORS
============================================================================= */

export const sayHello = createAction(SAY_HELLO);

export const clearForm = createAction(CLEAR_FORM);

export const changeFirst = createAction(CHANGE_FIRST, (first) => ({first}));

export const changeLast = createAction(CHANGE_LAST, (last) => ({last}));

/* ============================================================================
REDUCER --- ACTION HANDLER
============================================================================= */

export default handleActions({
	[SAY_HELLO] : state => ({
		...state,
		hello: true
	}),
	[CHANGE_FIRST] : (state, action) => {
		return {
			...state,
			user: {
				...state.user,
				first: action.payload.first
			}	
		}
	},
	[CHANGE_LAST] : (state, action) => {
		return {
			...state,
			user: {
				...state.user,
				last: action.payload.last
			}	
		}
	},
	[CLEAR_FORM] : (state, action) => {
		return {
			...state,
			user: init.user
		}
	}
}, init);