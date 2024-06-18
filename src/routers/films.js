const express = require('express')
const { getAll, createFilm, findFilm, deleteFilm, updateFilm, update } = require('../controllers/films/filmsController')

const router = express.Router()

router.get('/', getAll)

router.post('/', createFilm)

router.get('/:id', findFilm)

router.delete('/:id', deleteFilm)

router.put('/:id', updateFilm)

router.patch('/:id', update)

module.exports = router