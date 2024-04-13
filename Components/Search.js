import React from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    FlatList,
} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-web'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.searchedText = '' // Initialisation de notre donnée searchedText en dehors du state
        this.state = {
            films: [],
            isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
        }
    }

    _loadFilms() {
        if (this.state.isLoading || this.searchedText.length === 0) return

        this.setState({ isLoading: true })

        getFilmsFromApiWithSearchedText(this.searchedText)
            .then((data) => {
                this.setState({ films: data.results, isLoading: false })
            })
            .catch((err) => {
                alert('erreur : \n' + err)
                this.setState({ isLoading: false })
            })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par setState
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }


    render() {
        if (this.state.isLoading) {
            return <View>{this._displayLoading()}</View>
        } else
            //console.log('RENDER')
            return (
                <View style={styles.main_container}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Titre du film"
                        onChangeText={(text) => this._searchTextInputChanged(text)}
                        onSubmitEditing={() => this._loadFilms()}
                    // créetion d'une procédure évenmentielle de chargement des films lorsque la touche entrée est appuyé
                    />
                    <Button title="Rechercher" onPress={() => this._loadFilms()}
                    />
                    <FlatList
                        data={this.state.films}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <FilmItem film={item} />}
                    />
                </View>
            )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Search