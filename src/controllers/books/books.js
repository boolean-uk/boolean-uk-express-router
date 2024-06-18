const { getAllBooks } = require("../../domain/books/books")
const newID = require("../../functions/createID")

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

    getAllBooks().push(newBook)
    res.status(201).json({
        books: newBook
    })
}

module.exports = {
    getBooks,
    addBook
}