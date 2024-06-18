const express = require('express')
const filmsRouter = express.Router()
const { getAllFilms, createFilm } = require("../controllers/filmsControllers.js")

filmsRouter.get("/", getAllFilms)
filmsRouter.post("/", createFilm)

module.exports = filmsRouter