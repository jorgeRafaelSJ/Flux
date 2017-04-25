import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import home from './home/redux';
// combines all the reducers into one main reducer object passed into the store.js
const appReducer = combineReducers({
	routing,
	home
});

const rootReducer = (state, action) => {
	// state resetter for specific actions

	return appReducer(state, action);
};

export default rootReducer;