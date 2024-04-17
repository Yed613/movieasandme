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

        const response = await axios.get(url)
        console.log('--getFilmsFromApiWithSearchedText--')
        console.log(url)
        console.log(response.data)
        console.log('--fin getFilmsFromApiWithSearchedText--')
        return response.data
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
    await sleep(5000)
}
const getFilmDetailFromApi = async (id) => {
    try {
        const url =
            'https://api.themoviedb.org/3/movie/' +
            id +
            '?api_key=' +
            API_TOKEN +
            '&language=fr'
        const response = await axios.get(url)
        return response.data
    } catch {
        console.error('Error fetching film detail:', error);
        throw error;
    }
}

export { getFilmDetailFromApi }
export { getImageFromApi }
export default getFilmsFromApiWithSearchedText
