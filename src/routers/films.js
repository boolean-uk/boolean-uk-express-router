const express = require("express")
const filmsRouter = express.Router()
const {
	getAllFilms,
	createNewFilm,
	getFilmById,
	getFilmByDirector,
	deleteFilmById,
	updateFilmById,
} = require("../controllers/filmsController.js")

// filmsRouter.get("/", getAllFilms)
filmsRouter.get("/", (req, res) => {
	if (req.query.director) {
		return getFilmByDirector(req, res)
	} else {
		return getAllFilms(req, res)
	}
})

filmsRouter.post("/", createNewFilm)

filmsRouter.get("/:id", getFilmById)

filmsRouter.delete("/:id", deleteFilmById)

filmsRouter.put("/:id", updateFilmById)

module.exports = filmsRouter
