import * as types from '../constants/ActionTypes';

export function sendTaskRequest() {
  return {
    type: types.MOVIE_INFO_REQUEST,
  };
}

// export function sendMovieInfo(movieInfo) {
//   return (dispatch) => {
//     dispatch(sendTaskRequest());
//     // setTimeout(() => {
//     //   dispatch(sendMovieInfoSuccess(movieInfo));
//     // }, 1000);
//     dispatch(sendMovieInfoSuccess(movieInfo));
//   };
// }

export function updateMovieInfo(data) {
  console.log('updateMovieInfo ', data);
  return {
    type: types.UPDATE_MOVIE_INFO,
    movieInfo: data,
  };
}
