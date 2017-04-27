import { createAction, handleActions } from 'redux-actions';
import { push } from 'react-router-redux';


/* ============================================================================
REDUCER INIT VALUE
============================================================================= */

const init = {
	showLogin: true,
};

/* ============================================================================
ACTIONS CONSTANTS
============================================================================= */

const SET_LOGIN_BUTTON_STATE = 'home/SET_LOGIN_BUTTON_STATE';

/* ============================================================================
ACTIONS - ACTION CREATORS
============================================================================= */

export const setLoginButtonState = createAction(SET_LOGIN_BUTTON_STATE, (bool) => ({bool}));
/* ============================================================================
REDUCER --- ACTION HANDLER
============================================================================= */

export default handleActions({
	[SET_LOGIN_BUTTON_STATE]: (state, action) => {
		return {
			...state, 
			showLogin: action.payload.bool
		}
	},
}, init);