import React, {
  AppRegistry,
  Component,
  ListView,
  WebView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = require ('../styles')

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

    REQUEST_URL = API_URL + this.props.story_id + URL_END
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData)

        var res = []
        var arrayLength = responseData.length

        for (var i = 0; i < arrayLength; i++) {
          res.push(responseData[i])
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
          response: res
        });

      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    console.log(this.state.response[0].pdf.url)
    return (
      // <ListView
      //   dataSource={this.state.dataSource}
      //   renderRow={this.renderChapters}
      //   style={styles.listView}
      // />

        <WebView source={{uri: 'http://automuseum.herokuapp.com'+ this.state.response[0].pdf.url}}/>
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
