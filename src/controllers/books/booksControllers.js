const { books } = require("../../../data/index.js")
const DataNotFoundError = require("../../errors/DataNotFoundError.js")
const {
  verifyBookBody,
  verifyBookTitle,
  addBookToDb,
  findBookId,
  removeBookFromDb,
  replaceBookInDb,
  verifyPatchOfBookBody,
  verifyBookBodyRequest,
} = require("../../domain/books/booksRepository.js")

const getBooks = (req, res) => {
  res.json({
    books: books,
  })
}

const postBook = (req, res) => {
  verifyBookBody(req)

  verifyBookTitle(req)

  const book = { id: books.length + 1, ...req.body }

  addBookToDb(book)

  res.status(201).json({
    book: book,
  })
}

const getBookById = (req, res) => {
  const id = Number(req.params.id)
  const book = findBookId(id)

  if (!book) {
    throw new DataNotFoundError("A book the provided ID does not exist")
  }

  res.json({
    book: book,
  })
}

const deleteBook = (req, res) => {
  const id = Number(req.params.id)
  const book = findBookId(id)

  if (!book) {
    throw new DataNotFoundError("A book the provided ID does not exist")
  }

  removeBookFromDb(book)

  res.json({
    book: book,
  })
}

const updateBook = (req, res) => {
  verifyBookBody(req)

  const id = Number(req.params.id)
  const book = findBookId(id)

  if (!book) {
    throw new DataNotFoundError("A book the provided ID does not exist")
  }

  const updatedBook = { id: book.id, ...req.body }

  verifyBookTitle(req)

  replaceBookInDb(book, updatedBook)

  res.json({
    book: updatedBook,
  })
}

const patchBook = (req, res) => {
  verifyPatchOfBookBody(req)

  const id = Number(req.params.id)
  const book = findBookId(id)

  if (!book) {
    throw new DataNotFoundError("A book the provided ID does not exist")
  }

  verifyBookTitle(req)

  let updatedBook = {}

  verifyBookBodyRequest(req, updatedBook, book)

  res.json({
    book: updatedBook,
  })
}

module.exports = {
  getBooks,
  postBook,
  getBookById,
  deleteBook,
  updateBook,
  patchBook,
}
