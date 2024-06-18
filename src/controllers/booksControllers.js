const data = require("../../data/index.js");
const books = data.books;
let idCounter = 5;
const {
    MissingFieldsError,
    DataAlreadyExistsError,
    DataNotFoundError,
  } = require("../errors/errors.js");

function getAllBooks(req, res) {
  res.status(200).json({ books });
}

function createBook(req, res) {
    const book = req.body
    if (!book.title || !book.type || !book.author) {
        throw new MissingFieldsError('Missing fields in request body')
    }
    if (books.find((b) => b.title === book.title)) {
        throw new DataAlreadyExistsError('A book with the provided title already exists')
    }
    books.push(book)
    res.status(201).json({ book })
}

function getBookById(req, res) {
    const bookId = Number(req.params.id)
    const book = books.find((book) => book.id === bookId)
    if (!book) {
        throw new DataNotFoundError('A book the provided ID does not exist')
    }
    res.status(200).json({ book })
}

function deleteBookById(req, res) {
    const bookId = Number(req.params.id)
    const book = books.find((book) => book.id === bookId)
    if (!book) {
        throw new DataNotFoundError('A book the provided ID does not exist')
    }
    const index = books.indexOf(book)
    books.splice(index, 1)
    res.status(200).json({ book })
}

function updateBookById(req, res) {
    const updatedParams = req.body
    if (!updatedParams.title || !updatedParams.type || !updatedParams.author) {
        throw new MissingFieldsError('Missing fields in request body')
    }
    const bookId = Number(req.params.id)
    const book = books.find((book) => book.id === bookId)
    if (!book) {
        throw new DataNotFoundError('A book the provided ID does not exist')
    }

    if (books.find((b) => b.title === updatedParams.title)) {
        throw new DataAlreadyExistsError('A book with the provided title already exists')

    }
    Object.assign(book, updatedParams)
    res.status(200).json({ book })
}

module.exports = { getAllBooks, createBook, getBookById, deleteBookById, updateBookById };
