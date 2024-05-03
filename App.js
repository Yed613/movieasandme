

/*export default class App extends React.Component {
  render() {
    return <Navigation />

  }
}



*/
import Search from './Components/Search';
import * as React from 'react'
import Navigation from './Navigation/Navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilmDetail from './Components/FilmDetail';
import { getFilmDetailFromApi } from './API/TMDBApi';

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

export { HomeScreen }





