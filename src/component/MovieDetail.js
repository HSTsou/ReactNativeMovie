import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  // Alert,
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Body,
} from 'native-base';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    padding: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

// class Movie {
//   constructor(mvName) {
//     this.mvName = mvName;
//   }

//   setName = (mvName) => {
//     this.mvName = mvName;
//   }

//   get getName() {
//     return this.mvName;
//   }
// }

export default class MovieDetail extends Component {
  formatStoryText = (text) => {
    // console.info('formatStoryText before', text);
    const formatText = String(text).split(':"');
    const end = String(formatText[1]).lastIndexOf('"}');
    const removeEndUselessText = String(formatText[1]).substring(0, end);
    return removeEndUselessText;
  };

  render() {
    // const movie = new Movie('test Name');
    // let n = movie.getName;
    // Alert.alert(n);
    const { movieInfo } = this.props;

    const { mvName } = movieInfo;
    const { enName } = movieInfo;
    const { imgLink } = movieInfo;
    // const { mvlength } = movieInfo;
    // const { IMDbRating } = movieInfo;
    const { playingDate } = movieInfo;

    const storyOri = JSON.stringify(movieInfo.story);

    return (
      <Container>
        <ScrollView>
          <Card>
            <View style={styles.centerContainer}>
              <Text style={styles.titleText}>{mvName}</Text>
              <Text style={styles.subTitleText}>{enName}</Text>
              <Text note style={styles.subTitleText}>
                {playingDate}
              </Text>

              <Image
                source={{
                  uri: imgLink,
                }}
                resizeMode="stretch"
                style={{
                  height: 360,
                  width: 270,
                }}
              />

              <CardItem>
                <Body>
                  <Text>{this.formatStoryText(storyOri)}</Text>
                </Body>
              </CardItem>
            </View>
          </Card>
        </ScrollView>
      </Container>
    );
  }
}

MovieDetail.propTypes = {
  movieInfo: PropTypes.any,
};

MovieDetail.defaultProps = {
  movieInfo: '',
};

module.export = MovieDetail;
