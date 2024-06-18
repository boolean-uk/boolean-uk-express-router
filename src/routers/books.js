const express = require('express')
const { getAll, createBook, findBook, deleteBook, updateBook } = require('../controllers/books/booksController')

const router = express.Router()

router.get('/', getAll)

router.post('/', createBook)

router.get('/:id', findBook)

router.delete('/:id', deleteBook)

router.put('/:id', updateBook)

module.exports = router