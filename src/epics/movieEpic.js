import { mapTo } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import Rx from 'rxjs';
import * as types from '../constants/ActionTypes';
import MobileApiService from '../networkutil/MobileApiService';

const mobileApiService = new MobileApiService();
const url = 'http://www.movingmoviezero.appspot.com/mvInfo?id=5107914712809472';

const fetchMovieInfo = (action$) => {
  return action$.ofType(types.GET_MOVIE_INFO_RX).switchMap(() =>
    Rx.Observable.from(mobileApiService.getLastVideo()).map((data) => ({
      type: types.UPDATE_MOVIE_INFO,
      movieInfo: data,
    })),
  );
};

// Observable.ajax.getJSON(url).map((data) => ({
// type: types.UPDATE_MOVIE_INFO,
// movieInfo: data,
// })),

const pingEpic = (action$) => {
  console.log('pingEpic');
  return action$
    .ofType(types.GET_MOVIE_INFO_RX)
    .delay(1000)
    .mapTo(() => {
      console.log('pingEpic mapTo');
      return { type: types.FETCHING_MOVIE_INFO_FAILURE };
    });
};

export default fetchMovieInfo;
