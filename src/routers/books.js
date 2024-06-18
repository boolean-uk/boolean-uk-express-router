const { Router } = require("express");
const { getBooks, addBook, getByID } = require("../controllers/books/books");

const router = Router()

router.get('/', getBooks)
router.post('/', addBook)
router.get('/:id', getByID)

module.exports = router
