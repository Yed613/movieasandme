import axios from 'axios'
import { API_TOKEN } from '@env'

const getFilmsFromApiWithSearchedText = async (text) => {

    try {

        await slowNetwork()
        const url =
            'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN
            +
            '&language=fr&query=' +
            text
        console.log(url)
        const response = await axios.get(url)
        console.log('--getFilmsFromApiWithSearchedText--')
        if (response.data && response.data.results) {
            console.log(response.data)
            return response.data;
        } else {
            throw new Error('Pas de résultats trouvés')
        }
    } catch (error) {
        console.error('Error fetching films:', error);
        throw error;
    }
}
const getImageFromApi = (name) => {
    if (name === null || name === undefined)
        return require('../assets/filmVide.png')
    // 'https://image.tmdb.org/t/p/original' + name
    // 'https://image.tmdb.org/t/p/w300' + name
    return { uri: 'https://image.tmdb.org/t/p/w300' + name }
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function slowNetwork() {
    await sleep(100)
}

const getFilmDetailFromApi = async (id) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=fr`;
        const response = await axios.get(url);
        console.log(url);
        console.log('--getFilmDetailFromApi--');

        const filmData = response.data;
        const trailerUrl = await getTrailerUrl(id); // Appel à une fonction pour obtenir l'URL de la bande annonce

        // Ajoute l'URL de la bande annonce à l'objet filmData
        filmData.trailer = trailerUrl;

        return filmData;
    } catch (error) {
        console.error('Error fetching film detail:', error);
        throw error;
    }
};

const getTrailerUrl = async (id) => {
    try {
        const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_TOKEN}&language=fr`;
        const response = await axios.get(videosUrl);
        console.log(videosUrl);
        console.log('--getTrailerUrl--');

        const videosData = response.data;
        const trailer = findTrailer(videosData.results); // Recherche de la bande annonce parmi les vidéos

        if (trailer) {
            // Retourne l'URL de la bande annonce
            return `https://www.youtube.com/watch?v=${trailer.key}`;
        } else {
            // Aucune bande annonce trouvée
            return null;
        }
    } catch (error) {
        console.error('Error fetching trailer:', error);
        throw error;
    }
};

const findTrailer = (videos) => {
    // Recherche de la première vidéo qui est une bande annonce (type = 'Trailer')
    return videos.find((video) => video.type === 'Trailer');
};




export { getFilmsFromApiWithSearchedText, getImageFromApi, getFilmDetailFromApi };

