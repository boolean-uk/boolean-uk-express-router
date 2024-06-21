// Import data here...
const express = require('express')
const router = express.Router()
const { getAll, createBook, GetBookById, deleteById, updateBookById } = require('../controller/booksController.js')
router.get('/', getAll)

router.post('/', createBook)

router.get('/:id', GetBookById)

router.delete('/:id', deleteById)

router.put('/:id', updateBookById)

module.exports = router 
