const {getAllFilms} = require('../../domain/films/films.js')
const newID = require('../../functions/createID.js')

let newFilm = {
    id: 0,
    title: 'string',
    director: 'string'
}

const getAll = (req, res) => {
    res.status(200).json({
        films: getAllFilms()
    })
}

const addFilm = (req, res) => {
    newFilm.id = newID(getAllFilms())
    newFilm.title = req.body.title
    newFilm.director = req.body.director

    getAllFilms().push(newFilm)
    res.status(201).json({
        film: newFilm
    })
}

module.exports = {
    getAll,
    addFilm
}