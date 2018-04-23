import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';
import MovieInfoPage from '../component/MovieInfoPage';
import configureStore from '../store/configureStore';

export default class MovieInfoIndex extends React.PureComponent {
  store = createStore(configureStore);
  render() {
    return (
      <Provider store={this.store}>
        <MovieInfoPage navigation={this.props.navigation} />
      </Provider>
    );
  }
}
