const filmsData = require("../../data/index.js")
const films = filmsData.films

let newFilmId = films.length + 1

const getAllFilms = (req, res) => {
	res.status(200).json({ films: films })
}

const createNewFilm = (req, res) => {
	const newFilm = req.body
	newFilm.id = newFilmId
	newFilmId += 1
	films.push(newFilm)
	res.status(201).json({ film: newFilm })
}

const getFilmById = (req, res) => {
	const filmId = Number(req.params.id)
	const foundFilm = films.find((b) => b.id === filmId)
	res.status(200).json({ film: foundFilm })
}

const deleteFilmById = (req, res) => {
	const filmId = Number(req.params.id)
	const filmToDelete = films.find((b) => b.id === filmId)
	const indexToDelete = films.indexOf(filmToDelete)
	films.splice(indexToDelete, 1)
	res.status(200).json({ film: filmToDelete })
}

const updateFilmById = (req, res) => {
	const filmId = Number(req.params.id)
	const updateFilm = req.body
	updateFilm.id = filmId
	films.splice(filmId - 1, 1, updateFilm)
	res.status(200).json({ film: updateFilm })
}

module.exports = {
	getAllFilms,
	createNewFilm,
	getFilmById,
	deleteFilmById,
	updateFilmById,
}
