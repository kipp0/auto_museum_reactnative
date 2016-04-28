import React, {
  AppRegistry,
  Component,
  ListView,
  TouchableOpacity,
  Navigator,
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = require ('../styles')

var API_URL = 'http://automuseum.herokuapp.com/api/stories.json';
var REQUEST_URL = API_URL;

class Stories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      title: this.title,
    };

    this.renderStories = this.renderStories.bind(this)
    this._navigate = this._navigate.bind(this)
  }
  componentWillMount() {
    var navigator = this.props.navigator
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

    return this.renderScene()
  }
  renderScene() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderStories}
        style={styles.listView}
      />
    )
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
  _navigate(story) {
    this.props.navigator.push({
      name: 'Chapters',
      index: 1,
      props: {
        story_id: story.id
      }
    })
  }
  renderStories(story) {
    return (
      <TouchableOpacity onPress={ () => this._navigate(story) }>
          <View style={styles.listViewCell}>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.description}>{story.description}</Text>
            <View style={styles.separator}></View>
          </View>
      </TouchableOpacity>
    );
  }
}


module.exports = Stories
