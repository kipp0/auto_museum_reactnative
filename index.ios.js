/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, {
 AppRegistry,
 Component,
 TouchableOpacity,
 Text,
 View,
} from 'react-native';


const styles = require ('./styles')
const Stories = require ('./components/stories')
const Router = require ('./components/router')

var welcome = 'Welcome to the Auto Museum!'
var instruction = 'Tap To Start'

class AutoMuseum extends Component {

  constructor(props) {
    super(props);
    this.state = {
      component: 'welcome',
    };
  }

  setComponent(c) {
    this.state.component = c
    this.forceUpdate()
  }

  render() {
    if ( this.state.component == 'welcome' ) {
      return this.renderWelcome()
    }

    return <Router />
  }

  renderWelcome() {
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.setComponent('stories') }>
        <View style={styles.container}>
          <Text style={styles.welcome}>{welcome}</Text>
          <Text style={styles.instructions}>{instruction}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

AppRegistry.registerComponent('AutoMuseum', () => AutoMuseum);
