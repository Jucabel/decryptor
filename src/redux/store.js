import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootRed from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootRed, initialState, compose(applyMiddleware(...middleware)));

export default store;