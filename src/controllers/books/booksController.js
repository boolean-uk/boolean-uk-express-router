const { getAllBooks, newBook, getBookById, deleteBookById, updateBookById } = require("../../domain/books/booksRepository")

let idCounter = 5

const getAll = (req, res) => {
    const books = getAllBooks()

    res.json({books})
}

const createBook = (req, res) => {
    const book = req.body

    book.id = idCounter
    newBook(book)

    idCounter++

    res.status(201).json({book})
}

const findBook = (req, res) => {
    const bookID = Number(req.params.id)
    const book = getBookById(bookID)

    res.json({book})
}

const deleteBook = (req, res) => {
    const bookID = Number(req.params.id)
    const book = getBookById(bookID)

    deleteBookById(bookID)

    res.json({book})
}

const updateBook = (req, res) => {
    const newBookInfo = req.body
    const bookID = Number(req.params.id)

    newBookInfo.id = bookID

    updateBookById(bookID, newBookInfo)

    res.json({book: newBookInfo})
}

module.exports = {
    getAll,
    createBook,
    findBook,
    deleteBook,
    updateBook
}