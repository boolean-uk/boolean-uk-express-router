const { Router } = require("express");
const { getBooks, addBook, getByID, removeBook } = require("../controllers/books/books");

const router = Router()

router.get('/', getBooks)
router.post('/', addBook)
router.get('/:id', getByID)
router.delete('/:id', removeBook)

module.exports = router
