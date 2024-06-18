let { films } = require("../../../data/index.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllFilms() {
    return films
}

function newFilm(film) {
    films.push(film)
}

function getFilmById(id) {
    const found = films.find((film) => film.id === id)

    if (!found) {
        throw new NotFoundError('A film with provided ID does not exist')
    }

    return found
}

function deleteFilmById(id) {
    const found = films.find((film) => film.id === id)

    if (!found) {
        throw new NotFoundError('A film with provided ID does not exist')
    }

    films = films.filter((film) => film.id !== id)
}

function updateFilmById(id, updatedFilm) {
    const found = films.find((film) => film.id === id)

    if (!found) {
        throw new NotFoundError('A film with provided ID does not exist')
    }
    
    Object.assign(films, updatedFilm)
}

module.exports = {
    getAllFilms,
    newFilm,
    getFilmById,
    deleteFilmById,
    updateFilmById
}