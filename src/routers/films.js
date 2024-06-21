const express = require('express')
const router = express.Router()
const { getAll, createFilm } = require('../controller/filmsContorller.js')

router.get('/', getAll )

router.post('/', createFilm)
module.exports = router