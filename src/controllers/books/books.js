const { getAllBooks, getBookByID, filterByTitle } = require("../../domain/books/books")
const newID = require("../../functions/createID")
const { deletedBooks } = require('../../../data/deletedData.js')

let newBook = {
    id: 0,
    title: 'string',
    type: 'string',
    author: 'string'
}

const getBooks = (req, res) => {
    res.status(200).json({
        books: getAllBooks()
    })
}

const addBook = (req, res) => {
    newBook.id = newID(getAllBooks())
    newBook.title = req.body.title
    newBook.type = req.body.type
    newBook.author = req.body.author

    if (
        newBook.title === "" ||
        newBook.type === "" ||
        newBook.author === ""
    ) {
        throw new FieldsMissing("Missing fields")
    }

    const checkTitle = filterByTitle(found.title)

    if(checkTitle) {
        throw new AlreadyExistsError("Book already exists")
    }

    getAllBooks().push(newBook)
    res.status(201).json({
        book: newBook
    })
}

const getByID = (req, res) => {
    const id = Number(req.params.id)
    const found = getBookByID(id)

    if (typeof id !== "number") {
        throw new InvalidDataError("ID must be a number")
    }

    if (!found) {
        throw new NotFoundError("Book not found")
    }

    res.status(200).json({
        book: found
    })
}

const removeBook = (req, res) => {
    const id = Number(req.params.id)
    const found = getBookByID(id)

    if (typeof id !== "number") {
        throw new InvalidDataError("ID must be a number")
    }

    if (!found) {
        throw new NotFoundError("Book not found")
    }

    deletedBooks.push(found)
    const index = getAllBooks().indexOf(found)
    getAllBooks().splice(index, 1)
    res.status(200).json({
        book: found
    })
}

const updateBook = (req, res) => {
    const id = Number(req.params.id)
    if (typeof id !== "number") {
        throw new InvalidDataError("ID must be a number")
    }

    const found = getBookByID(id)
    if (!found) {
        throw new NotFoundError("Book not found")
    }

    found.title = req.body.title
    found.type = req.body.type
    found.author = req.body.author

    if (
        found.title === "" ||
        found.type === "" ||
        found.author === ""
    ) {
        throw new BookFieldMissing("Missing fields")
    }

    const checkTitle = filterByTitle(found.title)

    if(checkTitle) {
        throw new BookAlreadyExistsError("Book already exists")
    }

    res.status(200).json({
        book: found
    })
}

module.exports = {
    getBooks,
    addBook,
    getByID,
    removeBook,
    updateBook
}