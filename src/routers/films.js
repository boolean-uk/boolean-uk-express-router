const { getAllFilms, postFilms, getFilmsById } = require('../controller/films')
const express = require("express")
const router = express.Router()


router.get('/', getAllFilms)

router.post('/', postFilms)

router.get('/:id', getFilmsById)

module.exports = router