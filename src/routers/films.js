// Import data here...
const express = require('express')
const router = express.Router()
const { getAllFilms, addFilm, getFilmById, deleteFilmById, updateFilmById , patchFilmById} = require('../controllers/films')

// Write routes here...
router.get('/', getAllFilms)

router.post('/', addFilm)

router.get('/:id', getFilmById)

router.delete('/:id', deleteFilmById)

router.put('/:id', updateFilmById)

router.patch('/:id', patchFilmById)

module.exports = router