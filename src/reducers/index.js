import { combineReducers } from 'redux';
import movieInfo from './movieInfo';

const movieApp = combineReducers({
  movieInfo,
});

export default movieApp;
