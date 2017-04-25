import { applyMiddleware, createStore, compose } from "redux"
import logger from "redux-logger"
import thunk from  "redux-thunk"

import reducer from './reducer'

let middleware;
let enhancer;
if(window.location.host == "localhost:3002") {
	middleware = applyMiddleware(thunk, logger());
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers = 
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  }) : compose;

	/* eslint-enable no-underscore-dangle */
		enhancer = composeEnhancers(
	  middleware
	  // other store enhancers if any
	);
} else {
	middleware = applyMiddleware(thunk);
}


export default createStore(reducer, enhancer || middleware);