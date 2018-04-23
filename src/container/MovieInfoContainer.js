import { Provider } from 'react-redux';
import React from 'react';
import MovieInfoPage from '../component/MovieInfoPage';
import configureStore from '../store/configureStore';

const store = configureStore;

export default class MovieInfoContainer extends React.PureComponent {
  render() {
    console.log('MovieInfoContainer = ', store.getState());
    return (
      <Provider store={store}>
        <MovieInfoPage navigation={this.props.navigation} />
      </Provider>
    );
  }
}
