/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, {
 AppRegistry,
 Component,
 Navigator,
 TouchableOpacity,
 Text,
 View,
} from 'react-native';


const styles = require ('../styles')
const Stories = require ('./stories')
const Chapters = require ('./chapters')

class Router extends Component {

  render() {
    return (
      <Navigator
        styles={{flex:1}}
        initialRoute={{ name: 'Stories', index: 0}}
        // ref={(nav) => {this.nav = nav}}
        navigator= {this.props.navigator}
        renderScene = { this.renderScene.bind(this) }
        configureScene={(route) => {
          if (route.sceneConfig)
            return route.sceneConfig
          else
            return Navigator.SceneConfigs.FloatFromRight
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navbar}
          />
        }
      />
    )
  }

  renderScene(route, nav) {
    switch (route.name) {
      case 'Chapters':
        return (<Chapters navigator={nav} title="Chapters List" {...route.props} />)
      default:
        return (<Stories navigator={nav} title="Stories List" {...route.props} />)
    }
  }

  _navigateBack(index) {
    this.props.navigator.pop({
      name: 'Stories',
      index: index - 1,
      props: {
        story_id: story.id
      }
    })
  }

}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return ((route.index > 0)?(
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
  RightButton(route, navigator, index, navState) {
    return ((route.index > 0)?(
      <TouchableOpacity
          onPress={() => navigator.push()}>
          <View style={{paddingLeft: 10,}}>
            <Text>
              Next
            </Text>
        </View>
      </TouchableOpacity>
    ): null)
  },
  Title(route, navigator, index, navState) {
    return (
      <Text>
        {index}
      </Text>
    )
  },
};
module.exports = Router
