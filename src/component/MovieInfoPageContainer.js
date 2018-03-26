import React, { Component } from 'react';
import MovieDetail from './MovieDetail';
import MovieTime from './MovieTime';
import MovieVideo from './MovieVideo';
import I18n from '../lib/i18n';

const ScrollableTabView = require('react-native-scrollable-tab-view');

export default class MovieInfoPage extends React.Component {
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

  componentWillMount() {
    const movieId = this.state.data.movieData.key.id;
    this.getMovieInfo(movieId);
  }

  onAfterLoad = (json) => {
    let jsonData = null;

    try {
      jsonData = JSON.parse(json);
    } catch (e) {
      jsonData = json;
    }

    this.setState({ movieInfo: jsonData });
  };

  getMovieInfo = (id) => {
    const url = `http://www.movingmoviezero.appspot.com/mvInfo?id=${id}`;

    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then((json) => {
        this.onAfterLoad(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  checkData = (data) => {
    if (data !== undefined && data !== null) {
      return false;
    }
    return true;
  };

  render() {
    // console.log(I18n.t('MovieInfo.information'));
    return (
      <ScrollableTabView>
        <MovieDetail tabLabel={I18n.t('MovieInfo.information')} movieInfo={this.state.movieInfo} />
        <MovieVideo tabLabel={I18n.t('MovieInfo.trailer')} movieInfo={this.state.movieInfo} />
        <MovieTime tabLabel={I18n.t('MovieInfo.time')} movieInfo={this.state.movieInfo} />
      </ScrollableTabView>
    );
  }
}

module.export = MovieInfoPage;
