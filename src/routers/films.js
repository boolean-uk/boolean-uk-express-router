const express = require('express')
const filmsRouter = express.Router()
const { getAllFilms, createFilm, getFilmById } = require("../controllers/filmsControllers.js")

filmsRouter.get("/", getAllFilms)
filmsRouter.post("/", createFilm)
filmsRouter.get("/:id", getFilmById)

module.exports = filmsRouter