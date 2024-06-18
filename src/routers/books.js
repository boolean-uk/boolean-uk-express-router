const epxress = require("express")
const { books } = require("../../data")
const MissingDataError = require("../errors/MissingDataError")
const ExistingDataError = require("../errors/ExistingDataError")
const DataNotFound = require("../errors/DataNotFound")
const router = epxress.Router()

router.get('/', (req, res) => {
    res.json({
        books: books
    })
})

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.type || !req.body.author) {
        throw new MissingDataError('Missing fields in request body')
    }

    const existingBook = books.find(b => b.title === req.body.title)

    if (existingBook) {
        throw new ExistingDataError('A book with the provided title already exists')
    }

    const book = {id: books.length + 1, ...req.body}

    books.push(book)

    res.status(201).json({
        book: book
    })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)

    if (!book) {
        throw new DataNotFound('A book the provided ID does not exist')
    }

    res.json({
        book: book
    })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)

    if (!book) {
        throw new DataNotFound('A book the provided ID does not exist')
    }

    books.splice(books.indexOf(book), 1)

    res.json({
        book: book
    })
})

router.put('/:id', (req, res) => {
    if (!req.body.title || !req.body.type || !req.body.author) {
        throw new MissingDataError('Missing fields in request body')
    }

    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)

    if (!book) {
        throw new DataNotFound('A book the provided ID does not exist')
    }

    const updatedBook = { id: book.id, ...req.body}

    const existingBook = books.find(b => b.title === req.body.title)

    if (existingBook) {
        throw new ExistingDataError('A book with the provided title already exists')
    }

    books.splice(books.indexOf(book), 1, updatedBook)

    res.json({
        book: updatedBook
    })
})

router.patch('/:id', (req, res) => {
    if (!req.body.title && !req.body.type && !req.body.author) {
        throw new MissingDataError('Missing fields in request body')
    }

    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)

    if (!book) {
        throw new DataNotFound('A book the provided ID does not exist')
    }

    const existingBook = books.find(b => b.title === req.body.title)

    if (existingBook) {
        throw new ExistingDataError('A book with the provided title already exists')
    }

    let updatedBook = {}

    if (req.body.title && !req.body.type && !req.body.author) {
        updatedBook = { id: book.id, ...req.body, type: book.type, author: book.author}
    }

    if (req.body.title && req.body.type && !req.body.author) {
        updatedBook = { id: book.id, ...req.body, author: book.author}
    }
    
    if (req.body.title && !req.body.type && req.body.author) {
        updatedBook = { id: book.id, title: req.body.title, type: book.type, author: req.body.author}
    }

    if (!req.body.title && req.body.type && !req.body.author) {
        updatedBook = { id: book.id, title: book.title, ...req.body, author: book.author}
    }

    if (!req.body.title && req.body.type && req.body.author) {
        updatedBook = { id: book.id, title: book.title, ...req.body}
    }

    if (!req.body.title && !req.body.type && req.body.author) {
        updatedBook = { id: book.id, title: book.title, type: book.type, ...req.body}
    }

    if (req.body.title && req.body.type && req.body.author) {
        updatedBook = { id: book.id, ...req.body}
    }

    res.json({
        book: updatedBook
    })
})

module.exports = router