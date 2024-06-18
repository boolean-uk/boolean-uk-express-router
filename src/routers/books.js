const express = require("express")
const {
  postBook,
  getBookById,
  deleteBook,
  updateBook,
  patchBook,
  getBooks,
} = require("../controllers/booksControllers")
const router = express.Router()

router.get("/", getBooks)

router.post("/", postBook)

router.get("/:id", getBookById)

router.delete("/:id", deleteBook)

router.put("/:id", updateBook)

router.patch("/:id", patchBook)

module.exports = router
