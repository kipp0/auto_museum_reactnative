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
        initialRoute={{ name: 'Stories' }}
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

}

var NavigationBarRouteMapper = {
  LeftButton(route, navigation, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    )
  },
  RightButton(route, navigation, index, navState) {
    return null
  },
  Title(route, navigation, index, navState) {
    return (
      <Text>
        {route.title}
      </Text>
    )
  },
};
module.exports = Router
