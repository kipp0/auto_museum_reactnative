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
        ref ={(nav) => {this.nav = nav}}
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
    return ((route.name == 'Chapters')?(
      <TouchableOpacity
          onPress={() => route.pop()}>
          <View style={{paddingLeft: 10,}}>
            <Text>
              Back
            </Text>
        </View>
      </TouchableOpacity>
    ): null)
  },
  RightButton(route, navigation, index, navState) {
    return null
  },
  Title(route, navigation, index, navState) {
    return (
      <Text>
        {route.name}
      </Text>
    )
  },
};
module.exports = Router
