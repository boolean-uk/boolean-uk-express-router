const filmsData = require("../../data/index.js")
const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("../errors/errors.js")

const films = filmsData.films

let newFilmId = films.length + 1

const getAllFilms = (req, res) => {
	res.status(200).json({ films: films })
}

const createNewFilm = (req, res) => {
	const newFilm = req.body
	if (!newFilm.title || !newFilm.director) {
		throw new MissingFieldsError("Missing fields in request body")
	}
	const existingTitle = films.find((f) => f.title === newFilm.title)
	if (existingTitle) {
		throw new ExistingDataError(
			"A film with the provided title already exists"
		)
	}

	newFilm.id = newFilmId
	newFilmId += 1
	films.push(newFilm)
	res.status(201).json({ film: newFilm })
}

const getFilmById = (req, res) => {
	const filmId = Number(req.params.id)
	const foundFilm = films.find((f) => f.id === filmId)
	if (!foundFilm) {
		throw new DataNotFoundError(
			"A film with provided ID does not exist"
		)
	}
	res.status(200).json({ film: foundFilm })
}

function getFilmByDirector(req, res) {
	const director = req.query.director
	const foundFilms = films.filter((f) => f.director === director)
	res.status(200).json({ films: foundFilms })
}

const deleteFilmById = (req, res) => {
	const filmId = Number(req.params.id)
	const filmToDelete = films.find((b) => b.id === filmId)
	if (!filmToDelete) {
		throw new DataNotFoundError(
			"A film with provided ID does not exist"
		)
	}
	const indexToDelete = films.indexOf(filmToDelete)
	films.splice(indexToDelete, 1)
	res.status(200).json({ film: filmToDelete })
}

const updateFilmById = (req, res) => {
	const filmId = Number(req.params.id)
	const updateFilm = req.body

	const foundFilm = films.find((f) => f.id === filmId)

	if (!foundFilm) {
		throw new DataNotFoundError(
			"A film with provided ID does not exist"
		)
	}

	if (!updateFilm.title || !updateFilm.director) {
		throw new MissingFieldsError("Missing fields in request body")
	}

	const existingTitle = films.find(
		(f) => f.title === updateFilm.title
	)
	if (existingTitle) {
		throw new ExistingDataError(
			"A film with the provided title already exists"
		)
	}

	updateFilm.id = filmId
	films.splice(filmId - 1, 1, updateFilm)
	res.status(200).json({ film: updateFilm })
}

module.exports = {
	getAllFilms,
	getFilmByDirector,
	createNewFilm,
	getFilmById,
	deleteFilmById,
	updateFilmById,
}
