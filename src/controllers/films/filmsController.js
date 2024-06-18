const { getAllFilms, newFilm, getFilmById, deleteFilmById, updateFilmById, patchFilmById } = require("../../domain/films/filmsRepository")

let idCounter = 5

const getAll = (req, res) => {
    const director = req.query.director

    if (director) {
       const filteredFilms = getAllFilms(director)

       return res.json({films: filteredFilms})
    }

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

const update = (req, res) => {
    const newFilmInfo = req.body
    const filmID = Number(req.params.id)

    newFilmInfo.id = filmID

    const patchedFilm = patchFilmById(filmID, newFilmInfo)

    res.json({film: patchedFilm})
}

module.exports = {
    getAll,
    createFilm,
    findFilm,
    deleteFilm,
    updateFilm,
    update
}