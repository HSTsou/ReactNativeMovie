import * as types from '../constants/ActionTypes';

export function sendTaskRequest() {
  return {
    type: types.MOVIE_INFO_REQUEST,
  };
}

export function updateMovieInfo(movieInfo) {
  console.log('updateMovieInfo actions = ', movieInfo);
  return {
    type: types.UPDATE_MOVIE_INFO,
    movieInfo,
  };
}
