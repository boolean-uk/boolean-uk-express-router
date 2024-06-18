const express = require('express')
const { getAll, createBook, findBook, deleteBook, updateBook, update } = require('../controllers/books/booksController')

const router = express.Router()

router.get('/', getAll)

router.post('/', createBook)

router.get('/:id', findBook)

router.delete('/:id', deleteBook)

router.put('/:id', updateBook)

router.patch('/:id', update)

module.exports = router