import React from 'react';
import { StatusBar, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainPage from './MainPage';
import MovieInfoContainer from './src/container/MovieInfoContainer';

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

const RootView = () => {
  console.log('@RootView init navigator');
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#0288D1" barStyle="light-content" />
      <AppNav />
    </View>
  );
};

export default RootView;
