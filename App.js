/*import React from 'react'
import Navigation from './Navigation/Navigation'



export default class App extends React.Component {
  render() {
    return <Navigation />

  }
}
*/
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Components/Search';
import Navigation from './Navigation/Navigation';
import { Button, View, Text } from 'react-native-web';
import FilmDetail from './Components/FilmDetail';

function HomeScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Search} />
        <Stack.Screen name="Detail" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






export default class App extends React.Component {
  render() {
    return (
      <HomeScreen />
    );
  }
}






