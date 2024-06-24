const { getAllFilms, postFilms, getFilmsById, deleteFilmById, updateFilmById } = require('../controller/films')
const express = require("express")
const router = express.Router()


router.get('/', getAllFilms)

router.post('/', postFilms)

router.get('/:id', getFilmsById)

router.delete('/:id', deleteFilmById)

router.put('/:id', updateFilmById)

module.exports = router