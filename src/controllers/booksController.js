const {
	getAllBks,
	createNewBk,
	getBkById,
	deleteBk,
	updateBkById,
} = require("../domain/booksRep.js")

const getAllBooks = (req, res) => {
	const users = getAllBks()

	res.status(200).json({ books })
}

const createNewBook = (req, res) => {
	const newBook = createNewBk(req.body)
	res.status(201).json({ newBook })
}

const getBookById = (req, res) => {
	const foundBook = getUsrById(Number(req.params.id))
	res.status(200).json({ foundBook })
}

const deleteBook = (req, res) => {
	const book = deleteBk(Number(req.params.id))
	res.status(200).json({ book })
}

const updateBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const data = req.body

	const updateBook = updateBkById
	res.status(200).json({ updateUser })
}

module.exports = {
	getAllBooks,
	createNewBook,
	getBookById,
	deleteBook,
	updateBookById,
}
