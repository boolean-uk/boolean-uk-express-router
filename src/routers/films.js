const express = require('express')
const filmsRouter = express.Router()
const { getAllFilms, createFilm, getFilmById, deleteFilmById, updateFilmById } = require("../controllers/filmsControllers.js")

filmsRouter.get("/", getAllFilms)
filmsRouter.post("/", createFilm)
filmsRouter.get("/:id", getFilmById)
filmsRouter.delete("/:id", deleteFilmById)
filmsRouter.put("/:id", updateFilmById)

module.exports = filmsRouter