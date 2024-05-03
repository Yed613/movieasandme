import React from 'react'
import { View, Text, Image, PreviewLayout } from 'react-native'
import { Button, StyleSheet } from 'react-native-web'
import { getImageFromApi } from '../API/TMDBApi'
import { Pressable } from 'react-native'



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

        const { film, displayDetailForFilm } = this.props;
        console.log(displayDetailForFilm)
        return (

            <View style={{
                flex: 1, flexDirection: 'row', backgroundColor: '#f0ffff', borderWidth: 3, borderColor: '#dcdcdc', borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50, borderCurve: 'circular'
            }}>
                <Image
                    style={styles.image}
                    source={getImageFromApi(film.poster_path)}
                    onPress={() => FilmDetail}

                />
                <View style={{ flex: 2, backgroundColor: '#f0ffff' }}>
                    <Text>
                        {film.title}

                    </Text>
                </View>
                <View style={{ flex: 2, backgroundColor: 'white', color: 'black' }}>


                    <Pressable onPress={() => displayDetailForFilm(film.id)} ><Text>Détail film</Text> </Pressable>

                </View>
                <View style={{ flex: 3, flexDirection: 'row', backgroundColor: '#f0ffff' }}>
                    <Text>
                        {film.vote_average}
                    </Text>
                </View>
                <View style={{ flex: 4, backgroundColor: '#f0ffff' }}>
                    <Text>
                        {film.overview}
                    </Text>

                </View>
                <View style={{ flex: 5, backgroundColor: '#f0ffff' }}>
                    <Text>
                        {film.release_date}
                    </Text>
                </View>
            </View>

        )

    }
}

export default FilmItem