let { books } = require("../../../data/index.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllBooks() {
    return books
}

function newBook(book) {
    books.push(book)
}

function getBookById(id) {
    const found = books.find((book) => book.id === id)

    if (!found) {
        throw new NotFoundError('A book the provided ID does not exist')
    }

    return found
}

function deleteBookById(id) {
    const found = getBookById(id)

    if (!found) {
        throw new NotFoundError('A book the provided ID does not exist')
    }

    books = books.filter((book) => book.id !== id)
}

function updateBookById(id, updatedBook) {
    const found = getBookById(id)

    if (!found) {
        throw new NotFoundError('A book the provided ID does not exist')
    }

    Object.assign(books, updatedBook)
}

module.exports = {
    getAllBooks,
    newBook,
    getBookById,
    deleteBookById,
    updateBookById
}