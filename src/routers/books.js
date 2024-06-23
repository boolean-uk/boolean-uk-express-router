// Import data here...
const Router = require('express')
const { getAllBooks } = require('../controller/books')

// Write routes here...
const router = Router()

router.get('/', getAllBooks)

module.exports = router