const booksData = require("../../data/index.js")
const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("../errors/errors.js")

const books = booksData.books
let newBookId = books.length + 1

const getAllBooks = (req, res) => {
	res.status(200).json({ books: books })
}

const createNewBook = (req, res) => {
	const newBook = req.body

	if (!newBook.title || !newBook.author || !newBook.type) {
		throw new MissingFieldsError("Missing fields in request body")
	}
	if (books.find((b) => b.title === newBook.title)) {
		throw new ExistingDataError(
			"A book with the provided title already exists"
		)
	}
	newBook.id = newBookId
	newBookId += 1
	books.push(newBook)
	res.status(201).json({ book: newBook })
}

const getBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const foundBook = books.find((b) => b.id === bookId)
	if (!foundBook) {
		throw new DataNotFoundError(
			"A book the provided ID does not exist"
		)
	}
	res.status(200).json({ book: foundBook })
}

const deleteBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const bookToDelete = books.find((b) => b.id === bookId)
	if (!bookToDelete) {
		throw new DataNotFoundError(
			"A book the provided ID does not exist"
		)
	}
	const indexToDelete = books.indexOf(bookToDelete)
	books.splice(indexToDelete, 1)
	res.status(200).json({ book: bookToDelete })
}

const updateBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const updateBook = req.body
	const foundBook = books.find((b) => b.id === bookId)

	if (!foundBook) {
		throw new DataNotFoundError(
			"A book the provided ID does not exist"
		)
	}
	
	if (
		!updateBook.title ||
		!updateBook.type ||
		!updateBook.author 
	) {
		throw new MissingFieldsError('Missing fields in request body')
	}

	const existingTitle = books.find((b) => b.title === updateBook.title)
	if (existingTitle) {
		throw new ExistingDataError(
			"A book with the provided title already exists"
		)
	}
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
