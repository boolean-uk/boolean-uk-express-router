// Import data here...
const express = require('express')
const router = express.Router()
const { getAllFilms, addFilm, getFilmById, deleteFilmById, updateFilmById } = require('../controllers/films')

// Write routes here...
router.get('/', getAllFilms)

router.post('/', addFilm)

router.get('/:id', getFilmById)

router.delete('/:id', deleteFilmById)

router.put('/:id', updateFilmById)

module.exports = router