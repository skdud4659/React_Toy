import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import dict from "./modules/dict";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({dict});
// const rootReducer = combineReducers({bucket, a, b, c, ...})

const store = createStore(rootReducer, enhancer);

export default store