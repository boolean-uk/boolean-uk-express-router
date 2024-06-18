let { films } = require("../../../data/index.js")
const AlreadyExistsError = require("../../errors/alreadyExistsError.js")
const MissingFieldsError = require("../../errors/missingFieldsError.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllFilms() {
    return films
}

function newFilm(film) {
    if (!verifyFilmProperties(film)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    if (verifyFilm(film)) {
        throw new AlreadyExistsError('A film with the provided title already exists')
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

    if (verifyFilm(updatedFilm)) {
        throw new AlreadyExistsError('A film with the provided title already exists')
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

function verifyFilm(object) {
    const foundFilm = films.find((film) => film.title === object.title)

    if (foundFilm) {
        return true
    }

    return false
}  

module.exports = {
    getAllFilms,
    newFilm,
    getFilmById,
    deleteFilmById,
    updateFilmById
}