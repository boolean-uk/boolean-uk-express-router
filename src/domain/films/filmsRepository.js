let { films } = require("../../../data/index.js")

function getAllFilms() {
    return films
}

function newFilm(film) {
    films.push(film)
}

function getFilmById(id) {
    return films.find((film) => film.id === id)
}

function deleteFilmById(id) {
    films = films.filter((film) => film.id !== id)
}

function updateFilmById(updatedFilm) {
    Object.assign(films, updatedFilm)
}

module.exports = {
    getAllFilms,
    newFilm,
    getFilmById,
    deleteFilmById,
    updateFilmById
}