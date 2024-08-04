const router = require('express').Router()
const data = require('../../data')
const { books } = data

let nextId = 5

router.get('/', (req, res) => {
    res.json({ books: books })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const queriedBook = books.find((book) => book.id === id)

    res.json({
        book: queriedBook,
    })
})

router.post('/', (req, res) => {
    const book = {
        ...req.body,
        id: nextId,
    }

    books.push(book)
    nextId++

    res.status(201).json({ book })
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updatedBook = req.body
    console.log(updatedBook)

    const bookIndex = books.findIndex((book) => book.id === id)

    books[bookIndex] = {
        ...books[bookIndex],
        ...updatedBook,
    }

    res.json({ book: books[bookIndex] })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const bookIndex = books.findIndex((book) => book.id === id)
    const [deletedFilm] = books.splice(bookIndex, 1)

    res.status(200).json({ book: deletedFilm })
})

module.exports = router
