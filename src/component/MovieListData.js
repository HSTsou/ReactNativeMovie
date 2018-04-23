/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import { Text, Image } from 'react-native';
import { Card, CardItem, Left, Body } from 'native-base';
import PropTypes from 'prop-types';

export default class MovieListData extends React.PureComponent {
  // static get propTypes() {
  //   return {
  //     data: PropTypes.array.isRequired,
  //   };
  // }
  onPressItem = (movieData) => {
    this.props.navigation.navigate('Second', { movieData });
  };

  render() {
    const movieData = this.props.data;

    return (
      <Card>
        <CardItem
          button
          onPress={() => {
            this.onPressItem(movieData);
          }}
        >
          <Image
            source={{
              uri: movieData.imgLink,
            }}
            style={{
              height: 120,
              width: 90,
            }}
          />
          <Left>
            <Body>
              <Text>{movieData.mvName}</Text>
              <Text>{movieData.enName}</Text>
              <Text>{movieData.playingDate}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}
