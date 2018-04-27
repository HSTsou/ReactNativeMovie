import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import MovieDetail from './MovieDetail';
import MovieTime from './MovieTime';
import MovieVideo from './MovieVideo';
import I18n from '../lib/i18n';
// import { updateMovieInfo } from '../actions/movieAction';
import * as Actions from '../actions/movieAction';
import MobileApiService from '../networkutil/MobileApiService';

const ScrollableTabView = require('react-native-scrollable-tab-view');

const mobileApiService = new MobileApiService();
export class MovieInfoContainer extends Component {
  static navigationOptions = {
    title: 'Movie Information',
  };

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.navigation.state.params,
    };
  }

  componentDidMount() {
    console.log('movieinfo componentDidMount ');
    const movieId = this.state.data.movieData.key.id;
    this.getMovieInfo(movieId);
  }

  componentWillReceiveProps(nextProps) {
    console.log('movieinfo componentWillReceiveProps ', nextProps);
  }

  componentWillUnmount() {
    console.log('movieinfo componentWillUnmount ');
    this.props.clearMovieInfo();
  }


  onSuccessLoaded = (json) => {
    let jsonData = null;

    try {
      jsonData = JSON.parse(json);
    } catch (e) {
      jsonData = json;
    }
    this.props.updateMovieInfo(jsonData);
  };

  getMovieInfo = (id) => {
    const url = `http://www.movingmoviezero.appspot.com/mvInfo?id=${id}`;

    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        this.onSuccessLoaded(json);
      })
      .catch((error) => {
        console.error(error);
        this.props.onUpdateMovieInfoFailed();
      });
  };

  checkData = (data) => {
    if (data !== undefined && data !== null) {
      return false;
    }
    return true;
  };

  render() {
    console.log('render() props = ', this.props);
    const { movieInfo } = this.props;
    console.log('render() movieInfo = ', movieInfo);
    let info;

    if (movieInfo.length > 0) {
      info = movieInfo[0].movieInfo;
    }

    console.log('render() info > 0 = ', info);
    return (
      <ScrollableTabView>
        <MovieDetail
          tabLabel={I18n.t('MovieInfo.information')}
          movieInfo={info}
        />
        <MovieVideo tabLabel={I18n.t('MovieInfo.trailer')} movieInfo={info} />
        <MovieTime tabLabel={I18n.t('MovieInfo.time')} movieInfo={info} />
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps .state = ', state);
  return {
    movieInfo: state.movieInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('mapDispatchToProps ');
  return bindActionCreators(Actions, dispatch);
};

const MovieInfo = connect(mapStateToProps, mapDispatchToProps)(MovieInfoContainer);
export default MovieInfo;
