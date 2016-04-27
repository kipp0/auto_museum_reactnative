import React, {
  AppRegistry,
  Component,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';


var API_URL = 'http://automuseum.herokuapp.com/api/stories/';
var URL_END = '/chapters.json';
var REQUEST_URL = API_URL + '10' + URL_END;

class Chapters extends Component {
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
        renderRow={this.renderChapters}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Loading Chapters...
        </Text>
      </View>
    );
  }

  renderChapters(chapter) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{chapter.title}</Text>
          <Text style={styles.description}>{chapter.position}</Text>
        </View>
      </View>
    );
  }
}


module.exports = Chapters
