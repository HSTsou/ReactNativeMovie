import * as types from '../constants/ActionTypes';

export function clearMovieInfo() {
  console.log('clearMovieInfo actions');
  return {
    type: types.CLEAR_MOVIE_INFO,
  };
}

export function updateMovieInfo(movieInfo) {
  console.log('updateMovieInfo actions = ', movieInfo);
  return {
    type: types.UPDATE_MOVIE_INFO,
    movieInfo,
  };
}

export function onUpdateMovieInfoFailed() {
  console.log('onUpdateMovieInfoFailed actions = ');
  return {
    type: types.FETCHING_MOVIE_INFO_FAILURE,
  };
}
