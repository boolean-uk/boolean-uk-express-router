let { books } = require("../../../data/index.js")

function getAllBooks() {
    return books
}

function newBook(book) {
    books.push(book)
}

function getBookById(id) {
    return books.find((book) => book.id === id)
}

function deleteBookById(id) {
    books = books.filter((book) => book.id !== id)
}

function updateBookById(updatedBook) {
    Object.assign(books, updatedBook)
}

module.exports = {
    getAllBooks,
    newBook,
    getBookById,
    deleteBookById,
    updateBookById
}