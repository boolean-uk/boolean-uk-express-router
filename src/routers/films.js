const express = require('express')
const router = express.Router()
const { getAll, createFilm, GetFilmById } = require('../controller/filmsContorller.js')

router.get('/', getAll )

router.post('/', createFilm)

router.get('/:id' , GetFilmById)
module.exports = router