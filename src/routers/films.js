const express = require("express")
const filmsRouter = express.Router()

filmsRouter.get("/", getAllFilms)

filmsRouter.post("/", createNewFilm)

filmsRouter.get("/:id", getFilmById)

filmsRouter.delete("/:id", deleteFilmById)

filmsRouter.put("/:id", updateFilmById)

module.exports = filmsRouter
