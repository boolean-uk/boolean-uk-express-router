// Import data here...

const express = require('express')
const router = express.Router()
const { books } = require('../../data')


// Write routes here...
//all books
router.get('/', (request, respond) => {
    respond.status(200).json({ books })
})

// the ID''S 
router.get('/:id', (request, respond) => {
    const book = books.find(b => b.id === parseInt(request.params.id))
    if (book) {
        respond.status(200).json({ book })
    } else {
        respond.status(404).json({ error: 'Book not found'})
    }
})

router.post('/', (request, respond) => {
    const newBook = {id: books.length + 1, ...request.body}
    books.push(newBook)
    respond.status(201).json({ book: newBook })
})

router.put('/:id', (request, respond) => {
    const bookId = parseInt(request.params.id)
    const updatedBook = request.body

    const bookIndex = books.findIndex(book => book.id === bookId)

    if (bookIndex !== -1) {
        // Update the book found at bookIndex
        books[bookIndex] = { id: bookId, ...updatedBook }
        respond.status(200).json({ book: books[bookIndex] })
    } else {
        respond.status(404).json({ error: "Book not found" })
    }
});

router.delete("/:id", (request, respond) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(request.params.id)) 
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0]
        respond.status(200).json({ book: deletedBook })
    } else  {
        respond.status(404).json({ error: 'Book not found'})
    }
})







module.exports = router