const express = require('express')
const filmsRouter = express.Router()
const { getAllFilms, createFilm, getFilmById, deleteFilmById } = require("../controllers/filmsControllers.js")

filmsRouter.get("/", getAllFilms)
filmsRouter.post("/", createFilm)
filmsRouter.get("/:id", getFilmById)
filmsRouter.delete("/:id", deleteFilmById)

module.exports = filmsRouter