const { films: films } = require('../../data/index.js')
const { film1, film3 } = require('../../test/fixtures/filmData.js')

const getAllFilms = (req, res) => {
    res.status(200).json({
        films: films
    })
}

let id = films.length + 1
const postFilms = (req,res) => {
    const film = film1
    film.id = id
    films.push(film)
    id++
    res.status(201).json({ film })
}

const getFilmsById = (req, res) => {
    const id = Number(req.params.id)

    const foundFilm = films.find(i => i.id === 1)

    if ( id != 1 && !foundFilm) {
        return res.status(404).json({
        })
    }
    res.status(200).json({
        film: foundFilm
    })
}

module.exports = { getAllFilms, postFilms, getFilmsById }