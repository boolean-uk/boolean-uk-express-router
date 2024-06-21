const express = require('express')
const router = express.Router()
const { getAll } = require('../controller/filmsContorller.js')

router.get('/', getAll )

module.exports = router