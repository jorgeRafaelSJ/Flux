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
	showLogin: true,
	hello: false,
};

/* ============================================================================
ACTIONS CONSTANTS
============================================================================= */

const SAY_HELLO = 'home/SAY_HELLO';

const SET_LOGIN_BUTTON_STATE = 'home/SET_LOGIN_BUTTON_STATE';

/* ============================================================================
ACTIONS - ACTION CREATORS
============================================================================= */

export const sayHello = createAction(SAY_HELLO);

export const setLoginButtonState = createAction(SET_LOGIN_BUTTON_STATE, (bool) => ({bool}));
/* ============================================================================
REDUCER --- ACTION HANDLER
============================================================================= */

export default handleActions({
	[SET_LOGIN_BUTTON_STATE]: (state, action) => {
		console.log(action);
		return {
			...state, 
			showLogin: action.payload.bool
		}
	},
	[SAY_HELLO] : state => ({
		...state,
		hello: true
	})
}, init);