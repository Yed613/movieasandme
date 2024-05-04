/*import React from 'react'
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
import dayjs from 'dayjs'
import numeral from 'numeral'

class FilmDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            film: [], // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true, // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    componentDidMount() {
        console.log('Component FilmDetail mounted');
        console.log('Props:', this.props);

        const { idFilm } = this.props.route.params;
        getFilmDetailFromApi(idFilm)
            .then((data) => {
                this.setState({
                    film: data,
                    isLoading: false,
                })
            })
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
        const { film } = this.state
        console.log(this.props.navigation)
        return (
            <ScrollView style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                    {film.title}
                </Text>
                <Text>{film.overview}</Text>
                <Text>{film.vote_average}</Text>
            </ScrollView>
        );


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
*/
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native';
import { getImageFromApi, getFilmDetailFromApi } from '../API/TMDBApi';
import dayjs from 'dayjs';
import numeral from 'numeral';

class FilmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: null,
            isLoading: true,
        };
    }

    componentDidMount() {
        const idFilm = this.props.route.params?.idFilm;
        if (idFilm) {
            getFilmDetailFromApi(idFilm)
                .then((data) => {
                    this.setState({
                        film: data,
                        isLoading: false,
                    });
                })
                .catch((error) => {
                    console.error('Error fetching film details:', error);
                    this.setState({ isLoading: false });
                });
        }
    }

    renderLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }

    renderFilm() {
        const { film } = this.state;
        if (film) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.backdrop_path || film.poster_path) }}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>
                        Sorti le {dayjs(film.release_date).format('DD/MM/YYYY')}
                    </Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>
                        Budget : {numeral(film.budget).format('0,0[.]00 $')}
                    </Text>
                    <Text style={styles.default_text}>
                        Genre(s) : {film.genres.map((genre) => genre.name).join(' / ')}
                    </Text>
                    <Text style={styles.default_text}>
                        Companie(s) : {film.production_companies.map((company) => company.name).join(' / ')}
                    </Text>
                </ScrollView>
            );
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this.renderLoading()}
                {this.renderFilm()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollview_container: {
        flex: 1,
    },
    image: {
        height: 169,
        margin: 5,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        margin: 5,
        color: '#000000',
        textAlign: 'center',
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15,
    },
    default_text: {
        margin: 5,
    },
});

export default FilmDetail;

