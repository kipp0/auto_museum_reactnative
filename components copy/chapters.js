import React, {
  AppRegistry,
  Component,
  ListView,
  WebView,
  StyleSheet,
  Navigator,
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
        console.log(this.state.index);
        this.setState({
          url: 'http://automuseum.herokuapp.com'+responseData[0].pdf.url,
          loaded: true,
          response: responseData,
          index: this.state.index + 1,
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

      <Navigator
        styles={{flex:1}}
        navigator= {this.props.navigator}
        renderScene = { this.renderChapter.bind(this) }
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navbar}
          />
        }
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

  renderChapter(chapter) {
    return (
      <WebView
              styles={styles.webView}
              source={{uri: this.state.url}}
      />
    );
  }
}


var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState, story_id) {
    return ((index > 0)?(
      <TouchableOpacity
          onPress={() => navigator.pop()}>
          <View style={{paddingLeft: 10,}}>
            <Text>
              Back
            </Text>
        </View>
      </TouchableOpacity>
    ): null)
  },
  RightButton(route, navigator, index, navState, story_id) {
    return ((index > 0)?(
      <TouchableOpacity
          onPress={ () => {
            navigator.push({
              name: 'Chapters',
              props: this.state
            })

          }}>
          <View style={{paddingRight: 10,}}>
            <Text>
              Next
            </Text>
        </View>
      </TouchableOpacity>
    ): null)
  },
  Title(route, navigator, index, navState, story_id) {
    return (
      <Text>
        {route.index}
      </Text>
    )
  },
};

module.exports = Chapters
