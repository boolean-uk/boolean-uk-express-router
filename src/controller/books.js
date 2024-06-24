const { books: books } = require('../../data/index')
const { book1, book2 } = require('../../test/fixtures/userData.js')

const getAllBooks = (req, res) => {
    res.status(200).json({
        books: books
    })
}


const postBooks = (req,res) => {
    let id = books.length + 1
    const book = book1
    book.id = id
    books.push(book)
    id++
    res.status(201).json({ book })
}

const getBooksById = (req, res) => {
    const id = Number(req.params.id)

    const foundBook = books.find(i => i.id === id)

    if ( id != 1 && !foundBook) {
        return res.status(404).json({
        })
    }
    res.status(200).json({
        book: foundBook
    })
}

const deleteBookById = (req, res) => {
    const id = Number(req.params.id)
  
    const bookFound = books.find((c) => c.id === id)
    const bookIndex = books.indexOf(bookFound)
    books.splice(bookIndex, 1)
    return res.status(200).json({ book: bookFound })
}

const updateBookById = (req, res) => {
	const bookId = Number(req.params.id)
	const updatedBook = req.body
	updatedBook.id = bookId
	books.splice(bookId - 1, 1, updatedBook)
	res.status(200).json({ 'book': updatedBook })
}


module.exports = { getAllBooks, postBooks, getBooksById, deleteBookById, updateBookById }