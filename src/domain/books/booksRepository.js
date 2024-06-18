const { books } = require("../../../data/index.js")
const ExistingDataError = require("../../errors/ExistingDataError.js")
const MissingDataError = require("../../errors/MissingDataError.js")

const verifyBookBody = (req) => {
  if (!req.body.title || !req.body.type || !req.body.author) {
    throw new MissingDataError("Missing fields in request body")
  }
}

const verifyBookTitle = (req) => {
  const existingBook = books.find((b) => b.title === req.body.title)

  if (existingBook) {
    throw new ExistingDataError(
      "A book with the provided title already exists"
    )
  }
}

const addBookToDb = (book) => {
  books.push(book)
}

const findBookId = (id) => {
  return books.find((b) => b.id === id)
}

const removeBookFromDb = (book) => {
  books.splice(books.indexOf(book), 1)
}

const replaceBookInDb = (book, updatedBook) => {
  books.splice(books.indexOf(book), 1, updatedBook)
}

const verifyPatchOfBookBody = (req) => {
  if (!req.body.title && !req.body.type && !req.body.author) {
    throw new MissingDataError("Missing fields in request body")
  }
}

const verifyBookBodyRequest = (req, updatedBook, book) => {
  if (req.body.title && !req.body.type && !req.body.author) {
    return (updatedBook = {
      id: book.id,
      ...req.body,
      type: book.type,
      author: book.author,
    })
  }

  if (req.body.title && req.body.type && !req.body.author) {
    return (updatedBook = { id: book.id, ...req.body, author: book.author })
  }

  if (req.body.title && !req.body.type && req.body.author) {
    return (updatedBook = {
      id: book.id,
      title: req.body.title,
      type: book.type,
      author: req.body.author,
    })
  }

  if (!req.body.title && req.body.type && !req.body.author) {
    return (updatedBook = {
      id: book.id,
      title: book.title,
      ...req.body,
      author: book.author,
    })
  }

  if (!req.body.title && req.body.type && req.body.author) {
    return (updatedBook = { id: book.id, title: book.title, ...req.body })
  }

  if (!req.body.title && !req.body.type && req.body.author) {
    return (updatedBook = {
      id: book.id,
      title: book.title,
      type: book.type,
      ...req.body,
    })
  }

  if (req.body.title && req.body.type && req.body.author) {
    return (updatedBook = { id: book.id, ...req.body })
  }
}

module.exports = {
  verifyBookBody,
  verifyBookTitle,
  addBookToDb,
  findBookId,
  removeBookFromDb,
  replaceBookInDb,
  verifyPatchOfBookBody,
  verifyBookBodyRequest,
}
