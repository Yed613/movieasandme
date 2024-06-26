import React from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from "react-redux"
import FilmDetail from './FilmDetail';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = '' // Initialisation de notre donnée searchedText en dehors du state
        this.state = { films: [] }
    }

    _loadFilms() {
        if (this.searchedText.length === 0) return

        getFilmsFromApiWithSearchedText(this.searchedText)
            .then((data) => {
                this.setState({ films: data.results })
            })
            .catch((err) => {
                alert('erreur : \n' + err)
            })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text // Modification du texte recherché à chaque saisie de texte
    }

    _displayLoading() {
        return this.state.isLoading ? <ActivityIndicator size='large' /> : null
    }

    displayDetailForFilm = (idFilm) => {
        console.log("DIsplay details")
        this.props.navigation.navigate("Detail film", { idFilm: idFilm });
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Titre du film"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadFilms()}
                />
                <Button title="Rechercher" onPress={() => this._loadFilms()} />
                {this._displayLoading()}
                <FlatList

                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <FilmItem
                            film={item}
                            onPress={(FilmItem.onPress)}
                            displayDetailForFilm={this.displayDetailForFilm}
                            favoritesFilm={this.props.favoritesFilm} // Passer favoritesFilm comme prop à FilmItem
                        />
                    )}
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
})

/*const mapStateToProps = (state) => {
    return {
        films: state.films, // Assurez-vous que le reducer stocke les films dans le store sous la clé 'films'
        isLoading: state.isLoading, // Assurez-vous que le reducer stocke l'état de chargement dans le store sous la clé 'isLoading'
        favoritesFilm: state.favoritesFilm, // Assurez-vous que le reducer stocke les films favoris dans le store sous la clé 'favoritesFilm'
    }
}
*/
export default Search 
