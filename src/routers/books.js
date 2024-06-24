// Import data here...
const Router = require('express')
const { getAllBooks, postBooks, getBooksById, deleteBookById, updateBookById } = require('../controller/books')

// Write routes here...
const router = Router()

router.get('/', getAllBooks)

router.post('/', postBooks)

router.get('/:id', getBooksById)

router.delete('/:id', deleteBookById)

router.put('/:id', updateBookById)

module.exports = router