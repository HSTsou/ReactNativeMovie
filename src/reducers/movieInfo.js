import * as types from '../constants/ActionTypes';

export default function updateMoiveInfo(state = [], action) {
  switch (action.type) {
    case types.UPDATE_MOVIE_INFO:
      console.log('reducer receive action = ', action);
      return [
        ...state,
        {
          movieInfo: action.movieInfo,
        },
      ];
    default:
      return state;
  }
}
