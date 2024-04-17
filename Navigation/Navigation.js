
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'



const Stack = createNativeStackNavigator();
function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Rechercher film" component={Search} />
            </Stack.Navigator>
        </NavigationContainer >)
}

export default Navigation
