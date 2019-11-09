import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import movieAppReducers from '../reducers';
import movieEpic from '../epics/index';

const epicMiddleware = createEpicMiddleware(movieEpic);

const middleware = [epicMiddleware];

const configureStore = createStore(
  movieAppReducers,
  applyMiddleware(...middleware),
);
// const configureStore = createStore(movieAppReducers);
export default configureStore;
