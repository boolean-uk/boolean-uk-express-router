const epxress = require("express")
const { books } = require("../../data")
const router = epxress.Router()

router.get('/', (req, res) => {
    res.json({
        books: books
    })
})

router.post('/', (req, res) => {
    const book = {id: books.length + 1, ...req.body}

    books.push(book)

    res.status(201).json({
        book: book
    })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)

    res.json({
        book: book
    })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)

    books.splice(books.indexOf(book), 1)

    res.json({
        book: book
    })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(b => b.id === id)
    const updatedBook = { id: book.id, ...req.body}

    books.splice(books.indexOf(book), 1, updatedBook)

    res.json({
        book: updatedBook
    })
})

module.exports = router