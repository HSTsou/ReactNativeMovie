import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  Slider,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';

import Orientation from 'react-native-orientation';
import YouTube from 'react-native-youtube';

const screenWidth = Dimensions.get('window').width;

export default class YouTubePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View>
        <View
          style={{ flex: 1 }}
        >
          <YouTube
            ref={(videoPlayer) => {
            this.videoPlayer = videoPlayer;
          }}
            videoId="Zh4F3sZNLqA"
            play // control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop // control whether the video should loop when ended
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: 'stretch', height: 200 }}
          />

        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            title="开始播放"
            onPress={() => {
              this.playVideo();
            }}
          />
          <Button
            title="暂停播放"
            onPress={() => {
              this.pauseVideo();
            }}
          />
        </View>
      </View>
    );
  }

  onLoadStart() {
    console.log('视频开始加载');
  }

  onBuffering() {
    console.log('视频缓冲中...');
  }

  onLoaded(data) {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  }

  onProgressChanged(data) {
    console.log('视频进度更新');
    console.log(data.currentTime);
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
      });
    }
  }

  onPlayEnd() {
    console.log('视频播放结束');
    this.setState({
      currentTime: 0,
      isPlaying: false,
      showVideoCover: true,
    });
    this.videoPlayer.seek(0);
  }

  onPlayError() {
    console.log('视频播放失败');
  }

  // / 控制播放器工具栏的显示和隐藏
  hideControl() {
    if (this.state.showVideoControl) {
      this.setState({
        showVideoControl: false,
      });
    } else {
      this.setState(
        {
          showVideoControl: true,
        },
        // 5秒后自动隐藏工具栏
        () => {
          setTimeout(() => {
            this.setState({
              showVideoControl: false,
            });
          }, 5000);
        },
      );
    }
  }

  // / 点击了播放器正中间的播放按钮
  onPressPlayButton() {
    const isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay,
      showVideoCover: false,
    });
  }

  // / 点击了工具栏上的播放按钮
  onControlPlayPress() {
    this.onPressPlayButton();
  }

  // / 点击了工具栏上的全屏按钮
  onControlShrinkPress() {
    if (this.state.isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  }

  // / 进度条值改变
  onSliderValueChanged(currentTime) {
    this.videoPlayer.seek(currentTime);
    if (this.state.isPlaying) {
      this.setState({
        currentTime,
      });
    } else {
      this.setState({
        currentTime,
        isPlaying: true,
        showVideoCover: false,
      });
    }
  }

  // / 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  _onLayout = (event) => {
    // 获取根View的宽高
    const { width, height } = event.nativeEvent.layout;
    console.log(`通过onLayout得到的宽度：${width}`);
    console.log(`通过onLayout得到的高度：${height}`);

    // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
    const isLandscape = width > height;
    if (isLandscape) {
      this.setState({
        videoWidth: width,
        videoHeight: height,
        isFullScreen: true,
      });
    } else {
      this.setState({
        videoWidth: width,
        videoHeight: width * 9 / 16,
        isFullScreen: false,
      });
    }
    Orientation.unlockAllOrientations();
  };

  // /播放视频，提供给外部调用
  playVideo() {
    this.setState({
      isPlaying: true,
      showVideoCover: false,
    });
  }

  // / 暂停播放，提供给外部调用
  pauseVideo() {
    this.setState({
      isPlaying: false,
    });
  }

  // / 切换视频并可以指定视频开始播放的时间，提供给外部调用
  switchVideo(videoURL, seekTime) {
    this.setState({
      videoUrl: videoURL,
      currentTime: seekTime,
      isPlaying: true,
      showVideoCover: false,
    });
    this.videoPlayer.seek(seekTime);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  playButton: {
    width: 50,
    height: 50,
  },
  playControl: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  shrinkControl: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  time: {
    fontSize: 12,
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  control: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
