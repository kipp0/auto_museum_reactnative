import React, {
  AppRegistry,
  Component,
  ListView,
  TouchableOpacity,
  Navigator,
  StyleSheet,
  Text,
  View,
  PropTypes,
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
      story_id: this.props.story_id,
      index: 0
    };
    var navigator = this.props.navigator
    this.renderStories = this.renderStories.bind(this)
    this._navigate = this._navigate.bind(this)
    console.log("navigator:", this.props.navigator);
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
      props: {
        story_id: story.id,
        index: this.state.index,
        title: this.props.title
      }
    })
    this.setState({ index: 0 })
  }
  onStoryPress(story) {
    this.story = story
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


Stories.propTypes = {

  navigator: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}


module.exports = Stories
