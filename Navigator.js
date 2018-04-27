import { Provider } from 'react-redux';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainPage from './MainPage';
import MovieInfoContainer from './src/component/MovieInfoContainer';
import configureStore from './src/store/configureStore';

const store = configureStore;

const AppNav = StackNavigator(
  {
    First: {
      screen: MainPage,
    },
    Second: {
      screen: MovieInfoContainer,
    },
  },
  {
    initialRouteName: 'First',
    headerMode: 'float',
  },
);

const Navigator = () => {
  console.log('Navigator init');
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#0288D1" barStyle="light-content" />
      <Provider store={store}>
        <AppNav />
      </Provider>
    </View>
  );
};

export default Navigator;
