// Import data here...
const express = require("express")
const booksRouter = express.Router()
const {
	getAllBooks,
	createNewBook,
	getBookById,
	deleteBookById,
	updateBookById,
} = require("../controllers/booksController.js")

// Write routes here...
booksRouter.get("/", getAllBooks)

booksRouter.post("/", createNewBook)

booksRouter.get("/:id", getBookById)

booksRouter.delete("/:id", deleteBookById)

booksRouter.put("/:id", updateBookById)

module.exports = booksRouter
