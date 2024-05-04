
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
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
                    console.error('Error fetching film detail:', error);
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

    openTrailer = () => {
        const { film } = this.state;
        if (film && film.trailer) {
            // Ouvrir l'URL de la bande annonce dans le navigateur par défaut
            Linking.openURL(film.trailer);
        }
    };

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
                    {film.trailer && (
                        <TouchableOpacity style={styles.trailer_button} onPress={this.openTrailer}>
                            <Text style={styles.trailer_button_text}>Voir la bande annonce</Text>
                        </TouchableOpacity>
                    )}
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
    trailer_button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    trailer_button_text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FilmDetail;

