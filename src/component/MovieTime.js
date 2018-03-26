import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Left, Body } from 'native-base';
import PropTypes from 'prop-types';
import I18n from '../lib/i18n';

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    padding: 8,
  },
});

const MovieTime = (props) => {
  const times = props.movieInfo.allMvThShowtimeList;
  let timeStrs;

  if (times.length === 0) {
    timeStrs = I18n.t('MovieInfo.MovieTime.time');
    return (
      <View style={styles.centerContainer}>
        <Text>{timeStrs}</Text>
      </View>
    );
  }

  timeStrs = times.map((item) => {
    const splitedItem = item.split('|');
    const area = splitedItem[0];
    const atMovieTheaterId = splitedItem[1];
    const name = splitedItem[2];
    const language = splitedItem[3];
    const timeStr = splitedItem[4];

    return (
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{area}</Text>
              <Text>{atMovieTheaterId}</Text>
              <Text>{name}</Text>
              <Text>{language}</Text>
              <Text>{timeStr}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  });

  return (
    <Container>
      <Content>{timeStrs}</Content>
    </Container>
  );
};

MovieTime.propTypes = {
  movieInfo: PropTypes.any,
};

MovieTime.defaultProps = {
  movieInfo: [],
};

export default MovieTime;
// export default class MovieTime extends Component {
//   render() {
//     // console.info(this.props.movieInfo);
//     const times = this.props.movieInfo.allMvThShowtimeList;
//     let timeStrs;

//     if (times.length == 0) {
//       timeStrs = 'Not Yet On Show';
//       return (
//         <View style={styles.centerContainer}>
//           <Text>{timeStrs}</Text>
//         </View>
//       );
//     }

//     timeStrs = times.map((item, index) => {
//       const splitedItem = item.split('|');
//       const area = splitedItem[0];
//       const atMovieTheaterId = splitedItem[1];
//       const name = splitedItem[2];
//       const language = splitedItem[3];
//       const timeStr = splitedItem[4];

//       return (
//         <Card key={index}>
//           <CardItem>
//             <Left>
//               <Body>
//                 <Text>{area}</Text>
//                 <Text>{atMovieTheaterId}</Text>
//                 <Text>{name}</Text>
//                 <Text>{language}</Text>
//                 <Text>{timeStr}</Text>
//               </Body>
//             </Left>
//           </CardItem>
//         </Card>
//       );
//     });

//     return (
//       <Container>
//         <Content>{timeStrs}</Content>
//       </Container>
//     );
//   }
// }

// module.export = MovieTime;

