import * as types from '../constants/ActionTypes';

const initMovieInfoState = {}

export default function updateMoiveInfo(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_MOVIE_INFO:
      console.log('reducer receive UPDATE_MOVIE_INFO action = ', action);
      return [
        // ...state,
        {
          movieInfo: action.movieInfo,
        },
      ];
    case types.CLEAR_MOVIE_INFO:
      console.log('reducer receive CLEAR_MOVIE_INFO action = ', action);
      return [
        {
          movieInfo: {},
        },
      ];
    default:
      return state;
  }
}
