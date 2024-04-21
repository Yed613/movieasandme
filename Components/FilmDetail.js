import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import { getFilmDetailFromApi } from '../API/TMDBApi'
import 'react-json-pretty/themes/adventure_time.css'
import JSONPretty from 'react-json-pretty'

class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true, // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    componentDidMount() {
        console.log('Component FilmDetail monté')
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(
            (data) => {
                this.setState({
                    film: data,
                    isLoading: false,
                })
            }
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Component FilmDetail componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('Component FilmDetail componentWillUnmount')
    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Text>{this.state.film.title}</Text>
                    <JSONPretty data={this.state.film}></JSONPretty>
                </ScrollView>
            )
        }
    }
    displayDetailForFilm = (idFilm) => {
        console.log('film.id=' + idFilm)
        this.props.navigation.navigate('FilmDetail', { idFilm: idFilm })
    }

    render() {
        console.log(this.props.navigation)
        return (
            <View style={styles.main_container}>
                <Text>Détail du film</Text>
            </View>
        )


    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default FilmDetail