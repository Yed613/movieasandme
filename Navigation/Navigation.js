import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'



const SearchStackNavigator = createStackNavigator({
    // création de barre de navigation pour rechercher 
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher',
        },
    },
    FilmDetail: {
        screen: FilmDetail
    },

})


export default createAppContainer(SearchStackNavigator)
