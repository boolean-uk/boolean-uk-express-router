const data = require('../../../data/index.js')
const films = data.films


const getAllFilms = () => {
    return films
}

module.exports = {
    getAllFilms
}