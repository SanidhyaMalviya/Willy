import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TranscationScreen from './screens/BookTranscationScreen';
import SearchScreen from './screens/SearchScreen';

export default class App extends React.Component {
  render(){
    return <AppContainer/>
  }
}

const TabNavigator = createBottomTabNavigator({
  Transcation:{screen:TranscationScreen},
  Search:{screen:SearchScreen}
})

const AppContainer = createAppContainer(TabNavigator);