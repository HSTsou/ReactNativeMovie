import React, { Component } from 'react';
import { StyleSheet, View, WebView, Platform } from 'react-native';

export default class WebViewPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };
  }
  render() {
    // var id = "https://www.youtube.com/embed/dFKhWe2bBkM?rel=0&autoplay=0&showinfo=0&controls=0";
    const url = `https://www.youtube.com/embed/${this.state.id}?rel=0&autoplay=0&showinfo=0&controls=0`;
    return (
      <View style={{ height: 200 }}>
        <WebView
          style={styles.WebViewContainer}
          javaScriptEnabled
          domStorageEnabled
          source={{ uri: url }}
          injectedJavaScript={'function(){console.log("hihi")}'}
          onNavigationStateChange={navEvent => console.log(`hihi${navEvent.jsEvaluationValue}`)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0,
  },
});
