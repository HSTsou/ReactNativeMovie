import { bindActionCreators, createStore } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import MovieDetail from './MovieDetail';
import MovieTime from './MovieTime';
import MovieVideo from './MovieVideo';
import I18n from '../lib/i18n';
import * as MovieInfoActionCreators from '../actions/movieAction';
import movieAppReducers from '../reducers';
import axios from 'axios';
import MobileApiService from '../networkutil/MobileApiService';

const ScrollableTabView = require('react-native-scrollable-tab-view');

const mobileApiService = new MobileApiService();
const store = createStore(movieAppReducers);
// const listener = store.subscribe(() =>
//   this.setState(
//     { movieInfo: store.getState().movieInfo[0] },
//     console.log('store listener getState = ', store.getState()),
//   ),
// );

export class MovieInfoPage extends Component {
  static navigationOptions = {
    title: 'MovieInfoPage',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.navigation.state.params,
      movieInfo: [],
    };
  }

  componentDidMount() {
    const movieId = this.state.data.movieData.key.id;
    this.getMovieInfo(movieId);
    this.getLastVideo();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps ', nextProps);
  }

  onAfterLoad = (json) => {
    let jsonData = null;

    try {
      jsonData = JSON.parse(json);
    } catch (e) {
      jsonData = json;
    }
    store.dispatch(MovieInfoActionCreators.updateMovieInfo(jsonData));
  };

  getMovieInfo = (id) => {
    const url = `http://www.movingmoviezero.appspot.com/mvInfo?id=${id}`;

    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        this.onAfterLoad(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getLastVideo = () => {
    const data = {
      start: 0,
      end: 5,
    };

    const data2 = {
      start: 6,
      end: 15,
    };

    // const firstRequest = mobileApiService
    //   .getLastVideo(data)
    //   .then((response) => {
    //     console.log('mobileApiService response', response);
    //   })
    //   .catch((error) => {
    //     console.log('MobileApiService', error);
    //   });

    // const secondRequest = mobileApiService
    //   .getLastVideo(data2)
    //   .then((response) => {
    //     console.log('mobileApiService response', response);
    //   })
    //   .catch((error) => {
    //     console.log('MobileApiService', error);
    //   });

    // const firstRequest = mobileApiService.getLastVideo(data);
    // const secondRequest = mobileApiService.getLastVideo(data2);

    // axios.all([secondRequest, firstRequest]).then(
    //   axios.spread((first, second) => {
    //     console.log('mobileApiService response first ', first);
    //     console.log('mobileApiService response second ', second);
    //   }),
    // );
  };

  checkData = (data) => {
    if (data !== undefined && data !== null) {
      return false;
    }
    return true;
  };

  render() {
    const todosActionCreators = bindActionCreators(MovieInfoActionCreators);
    // console.log('todosActionCreators = ', todosActionCreators);
    console.log('render() props = ', this.props);
    console.log('render() state = ', this.state);
    const mvInfo = store.getState();

    // const mvInfo = this.state.movieInfo;
    return (
      <ScrollableTabView>
        <MovieDetail
          tabLabel={I18n.t('MovieInfo.information')}
          movieInfo={mvInfo.movieInfo}
        />
        <MovieVideo
          tabLabel={I18n.t('MovieInfo.trailer')}
          movieInfo={mvInfo.movieInfo}
        />
        <MovieTime
          tabLabel={I18n.t('MovieInfo.time')}
          movieInfo={mvInfo.movieInfo}
        />
      </ScrollableTabView>
    );
  }
}

// module.export = MovieInfoPage;

const mapStateToProps = (state) => {
  console.log('mapStateToProps .state = ', state);
  return {
    movieInfo: state.movieInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps ');
  return {
    newMovieInfo: bindActionCreators(MovieInfoActionCreators, dispatch),
  };
};

const MovieInfoPageContainer = connect(mapStateToProps, mapDispatchToProps)(
  MovieInfoPage,
);
export default MovieInfoPageContainer;
