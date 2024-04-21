import React from 'react'
import Navigation from './Navigation/Navigation'


export default class App extends React.Component {
  render() {
    return <Navigation />

  }
}
* /
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Components/Search';
import Navigation from './Navigation/Navigation';

function HomeScreen() {
  return (
    <Search />
  );
}



export default class App extends React.Component {
  render() {
    return (
      <Navigation />
    );
  }
}



