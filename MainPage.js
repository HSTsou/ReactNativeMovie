import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MovieListData from './src/component/MovieListData';
import fetchRequest from './src/networkutil/NetworkUtil';
import I18n from './src/lib/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin: 3,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#406E9F',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textCenter: {
    color: 'black',
    fontSize: 20,
    padding: 20,
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class MainPage extends Component {
  static navigationOptions = {
    title: 'MainPage',
  };

  constructor(props) {
    super(props);
    this.state = {
      originalData: [],
      data: [],
      loading: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.getMoviesFromApiAsync();
  }

  onSearchBarChangeText = (text) => {
    const originalDatas = this.state.originalData;

    const newData = originalDatas.filter((item) => {
      const mandarinName = item.mvName.toUpperCase();
      const englishName = item.enName.toUpperCase();
      const textData = text.toUpperCase();

      return (
        englishName.indexOf(textData) > -1 ||
        mandarinName.indexOf(textData) > -1
      );
    });

    this.setState({
      data: newData,
    });
  };

  getMoviesFromApiAsync = () => {
    this.showLoadingIndicator(true);

    fetchRequest('/all-mv', 'GET')
      .then((response) => {
        // console.info("_getMoviesFromApiAsync:", response);
        this.setState({
          originalData: response,
          data: response,
          refreshing: false,
        });
        this.showLoadingIndicator(false);
      })
      .catch((error) => {
        console.info(error);
        this.showLoadingIndicator(false);
      });
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  showLoadingIndicator = show => this.setState({ loading: show });

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
        loading: false,
        data: [],
      },
      () => {
        this.getMoviesFromApiAsync();
      },
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder={I18n.t('MovieListSearch.hint')}
        lightTheme
        round
        onChangeText={text => this.onSearchBarChangeText(text)}
        onClearText={this.getMoviesFromApiAsync}
        clearIcon
      />
    );
  };

  renderItem = ({ item }) => {
    return <MovieListData navigation={this.props.navigation} data={item} />;
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <ActivityIndicator
            style={styles.loading}
            color="#0000ff"
            size="large"
            animating={this.state.loading}
          />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={10}
          ListHeaderComponent={this.renderHeader}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}
