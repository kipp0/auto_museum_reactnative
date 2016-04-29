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
      url: '',
      loaded: false,
      story_id: this.props.story_id,
      index: this.props.index + 1
    };
    var navigator = this.props.navigator
    REQUEST_URL = API_URL + this.props.story_id + URL_END

    console.log("index:", this.state.index);
    console.log("story_id:", this.state.story_id);
    console.log("navigator:", this.props.navigator);

  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        this.setState({
          url: 'http://automuseum.herokuapp.com'+responseData[0].pdf.url,
          loaded: true,
          response: responseData
          index: this.state.index + 1
          story_id: this.state.story_id
        });

      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    console.log('http://automuseum.herokuapp.com'+
                    this.state.response[0].pdf.url);
    return (

        <WebView
                styles={styles.webView}
                source={{uri: this.state.url}}
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
