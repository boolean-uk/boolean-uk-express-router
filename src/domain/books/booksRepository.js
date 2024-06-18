let { books } = require("../../../data/index.js")
const MissingFieldsError = require("../../errors/missingFieldsError.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllBooks() {
    return books
}

function newBook(book) {
    if (!verifyBookProperties(book)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

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

    if (!verifyBookProperties(updatedBook)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    Object.assign(books, updatedBook)
}

function verifyBookProperties(object) {
    const neededProperties = ['title', 'type', 'author']

    for (const item of neededProperties) {
        if (object[item] === undefined) {
            return false
        }
    }

    return true
}

module.exports = {
    getAllBooks,
    newBook,
    getBookById,
    deleteBookById,
    updateBookById
}