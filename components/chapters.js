import React, {
  AppRegistry,
  Component,
  ListView,
  WebView,
  StyleSheet,
  Navigator,
  TouchableOpacity,
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
      index: this.props.index
    };
    var navigator = this.props.navigator
    REQUEST_URL = API_URL + this.props.story_id + URL_END

    console.log("index:", this.props.index);
    console.log("story_id:", this.props.story_id);
    console.log("story_id:", this.props);
    // console.log("navigator:", this.props.navigator);

  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    console.log(REQUEST_URL);
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {

        console.log(responseData);
        var nextIndex = this.state.index


        this.setState({
          url: 'http://automuseum.herokuapp.com'+responseData[nextIndex].pdf.url,
          loaded: true,
          index: nextIndex + 1,
          story_id: this.state.story_id,
        });
        this.props.navigator.story_id = this.state.story_id
        this.props.navigator.index = this.state.index
        // this.props.navigator.count = this.state.count
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    console.log(this.state.index);
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
}









// Chapters.propTypes = {
//
//   navigator: PropTypes.object.isRequired,
//   title: PropTypes.string.isRequired,
// }


module.exports = Chapters
