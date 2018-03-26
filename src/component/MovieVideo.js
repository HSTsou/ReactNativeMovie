import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

// import VideoPlayer from "./videoPlayer/VideoPlayer";
// import VideoPlayScreen from './videoPlayer/VideoPlayScreen';
// import YouTubePlayer from './videoPlayer/YoutubePlayer';
import WebViewPlayer from './videoPlayer/WebViewPlayer';

export default class MovieVideo extends Component {
  constructor(props) {
    super(props);
    this.state = { showVideoPlayer: true };
  }

  onClosePressed() {
    this.setState({ showVideoPlayer: false });
  }

  getId = (url) => {
    const ids = String(url).split('/');
    return ids[ids.length - 1];
  };

  render() {
    const urls = this.props.movieInfo.youtubeUrlList;
    // console.info(urls);

    if (urls.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Text>no video</Text>
        </View>
      );
    }
    const url = urls[0].value;
    const id = this.getId(url);
    return <WebViewPlayer id={id} />;
  }
}

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

module.export = MovieVideo;
