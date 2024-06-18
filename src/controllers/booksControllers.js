const data = require("../../data/index.js");
const books = data.books;
let idCounter = 5;

function getAllBooks(req, res) {
  res.status(200).json({ books });
}

function createBook(req, res) {
    const book = req.body
    books.push(book)
    res.status(201).json({ book })
}

function getBookById(req, res) {
    const bookId = Number(req.params.id)
    const book = books.find((book) => book.id === bookId)
    res.status(200).json({ book })
}

function deleteBookById(req, res) {
    const bookId = Number(req.params.id)
    const book = books.find((book) => book.id === bookId)
    const index = books.indexOf(book)
    books.splice(index, 1)
    res.status(200).json({ book })
}

function updateBookById(req, res) {
    const updatedParams = req.body
    const bookId = Number(req.params.id)
    const book = books.find((book) => book.id === bookId)
    Object.assign(book, updatedParams)
    res.status(200).json({ book })
}

module.exports = { getAllBooks, createBook, getBookById, deleteBookById, updateBookById };
