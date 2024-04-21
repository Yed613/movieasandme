
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'



const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Accueil'>
                <Stack.Screen name="Rechercher film" component={Search} options={{ title: 'Accueil' }} />
                <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Detail' }} />
            </Stack.Navigator>
        </NavigationContainer >)
}


export default Navigation
