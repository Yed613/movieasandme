import React from 'react'
import { Button, TextInput, View } from 'react-native'
// importation de l'api StyleSheets
import { StyleSheet } from 'react-native'
//import du composant permettant affichage liste et affichage text
import { FlatList, Text } from 'react-native-web'
// import du fichier filmsData.js
import films from '../Helpers/filmsData'



// création de dictionnaire data et affichage dans la FlatList
<FlatList
    data={[{ key: 'a' }, { key: 'b' }]}
    renderItem={({ item }) => <Text> {item.key} </Text>}
/>

renderItem = {
    function({ item }) {
        return (
            <FlatList
                data={films}
                renderItem={({ item }) => <FilmItem film={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        )
    }
}





// création de styles grâce a l'API StyleSheet
const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 2,
        paddingLeft: 50,
    },
    main_container: {
        marginTop: 20,

    }
})
class Search extends React.Component {
    // méthode principale retournant la barre de recherche et le bouton
    render() {
        return (

            <View style={styles.main_container}>
                < TextInput placeholder='Titre du film' style={styles.textinput} />
                <Button title='Rechercher' onPress={() => { }} />
            </View>

        )

    }
}
export default Search 