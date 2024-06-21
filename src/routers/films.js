const express = require('express')
const router = express.Router()
const { getAll, createFilm, GetFilmById, deleteById, updateFilmById } = require('../controller/filmsContorller.js')

router.get('/', getAll )

router.post('/', createFilm)

router.get('/:id', GetFilmById)

router.delete('/:id', deleteById)

router.put('/:id', updateFilmById)

router.patch('/:id', updateFilmById)

module.exports = router