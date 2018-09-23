import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as login from './login/reducer.js';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...login}),
  applyMiddleware(thunk)
);

export default store;