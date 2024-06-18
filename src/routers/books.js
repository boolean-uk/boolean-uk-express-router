const { Router } = require("express");
const { getBooks, addBook } = require("../controllers/books/books");

const router = Router()

router.get('/', getBooks)
router.post('/', addBook)

module.exports = router
