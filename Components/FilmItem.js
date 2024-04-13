import React from 'react'
import { View, Text, Image } from 'react-native'
import { StyleSheet } from 'react-native-web'
import { getImageFromApi } from '../API/TMDBApi'


// création d'un style pour les images des films grace a l'API StyleSheet et de chaque éléments de l'affichage des films
const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 180,
    },
    title: {
        color: 'green',
        flexDirection: 'column'
    },
    vote: {
        color: 'orange',
        flexDirection: 'row'
    },
    description: {
        color: 'red'
    },
    output: {
        color: 'purple'
    },

})



// class créer pour gérer l'affichage des films 
class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        console.log(this.props.film.title)
        return (
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'grey' }}>
                <Image
                    style={styles.image}
                    source={getImageFromApi(film.poster_path)}
                />
                <View style={{ flex: 2, backgroundColor: 'grey' }}>
                    <Text>
                        {film.title}
                    </Text>
                </View>
                <View style={{ flex: 3, flexDirection: 'row', backgroundColor: 'grey' }}>
                    <Text>
                        {film.vote_average}
                    </Text>
                </View>
                <View style={{ flex: 4, backgroundColor: 'grey' }}>
                    <Text>
                        {film.overview}
                    </Text>
                </View>
                <View style={{ flex: 5, backgroundColor: 'grey' }}>
                    <Text>
                        {film.release_date}
                    </Text>
                </View>
            </View>
        )

    }
}

export default FilmItem