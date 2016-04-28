import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(249,202,181)',

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
  navbar: {
    color: '#444',
    borderBottomColor: 'rgb(170,56,49)',
    borderBottomWidth: 4,
    backgroundColor: 'rgb(231,77,67)',
  },
  listView: {
    paddingTop: 65,
    backgroundColor: 'rgb(249,202,181)',
  },
  listViewCell: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: 'rgb(236,192,173)',
    borderBottomWidth: 1,
    borderTopColor: 'rgb(236,192,173)',
    borderTopWidth: 1
  },
});
