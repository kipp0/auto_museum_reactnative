/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, {
   AppRegistry,
   Component,
   ListView,
   StyleSheet,
   Text,
   View
 } from 'react-native';

 // var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
 var API_URL = 'http://automuseum.herokuapp.com/api/stories.json';
 // var PAGE_SIZE = 25;
 // var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
 var REQUEST_URL = API_URL;

class AutoMuseum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStories}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Loading Stories...
        </Text>
      </View>
    );
  }

  renderStories(story) {
    return (
      <View style={styles.container}>

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.description}>{story.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  rightContainer: {
    flex: 1,
    // backgroundColor: '#8be0c4',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AutoMuseum', () => AutoMuseum);
