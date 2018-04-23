import { createStore } from 'redux';
import movieAppReducers from '../reducers';

const configureStore = createStore(movieAppReducers);

export default configureStore;
