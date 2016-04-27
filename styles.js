import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(253,103,105)',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#fef',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  // navBar: {
  //   height: 60,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start'
  //   alignItems: 'flex-start'
  //   backgroundColor: '#000'
  // },
  navbar: {
    color: '#000',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  listView: {
    // paddingTop: 20,
  },
  listViewCell: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
});
