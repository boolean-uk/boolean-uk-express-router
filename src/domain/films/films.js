const data = require('../../../data/index.js')
const films = data.films


const getAllFilms = () => {
    return films
}

const getFilmByID = (id) => {
    return getAllFilms().find((f) => f.id === id)
}

module.exports = {
    getAllFilms,
    getFilmByID
}