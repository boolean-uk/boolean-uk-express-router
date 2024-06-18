const { getAllFilms, newFilm, getFilmById, deleteFilmById, updateFilmById } = require("../../domain/films/filmsRepository")

let idCounter = 5

const getAll = (req, res) => {
    const films = getAllFilms()

    res.json({films})
}

const createFilm = (req, res) => {
    const film = req.body

    film.id = idCounter
    newFilm(film)

    idCounter++

    res.status(201).json({film})
}

const findFilm = (req, res) => {
    const filmID = Number(req.params.id)
    const film = getFilmById(filmID)

    res.json({film})
}

const deleteFilm = (req, res) => {
    const filmID = Number(req.params.id)
    const film = getFilmById(filmID)

    deleteFilmById(filmID)

    res.json({film})
}

const updateFilm = (req, res) => {
    const newFilmInfo = req.body
    const filmID = Number(req.params.id)

    newFilmInfo.id = filmID

    updateFilmById(filmID, newFilmInfo)

    res.json({film: newFilmInfo})
}

module.exports = {
    getAll,
    createFilm,
    findFilm,
    deleteFilm,
    updateFilm
}