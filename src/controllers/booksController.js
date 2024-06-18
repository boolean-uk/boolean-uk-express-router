const booksData = require("../../data/index.js")
const books = booksData.books

let newBookId = books.length + 1

const getAllBooks = (req, res) => {
	res.status(200).json({ books: books })
}

const createNewBook = (req, res) => {
	const newBook = req.body
	newBook.id = newBookId
	newBookId += 1
	books.push(newBook)
	res.status(201).json({ book: newBook })
}

const getBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const foundBook = books.find((b) => b.id === bookId)
	res.status(200).json({ book: foundBook })
}

const deleteBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const bookToDelete = books.find((b) => b.id === bookId)
	const indexToDelete = books.indexOf(bookToDelete)
	books.splice(indexToDelete, 1)
	res.status(200).json({ book: bookToDelete })
}

const updateBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const updateBook = req.body
	updateBook.id = bookId
	books.splice(bookId - 1, 1, updateBook)
	res.status(200).json({ book: updateBook })
}

module.exports = {
	getAllBooks,
	createNewBook,
	getBookById,
	deleteBookById,
	updateBookById,
}
