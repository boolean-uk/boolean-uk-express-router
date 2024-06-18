let { films } = require("../../../data/index.js")
const MissingFieldsError = require("../../errors/missingFieldsError.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllFilms() {
    return films
}

function newFilm(film) {
    if (!verifyFilmProperties(film)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

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

    if (!verifyFilmProperties(updatedFilm)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    Object.assign(films, updatedFilm)
}

function verifyFilmProperties(object) {
    const neededProperties = ['title', 'director']

    for (const item of neededProperties) {
        if (object[item] === undefined) {
            return false
        }
    }

    return true
}

module.exports = {
    getAllFilms,
    newFilm,
    getFilmById,
    deleteFilmById,
    updateFilmById
}