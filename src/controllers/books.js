let { books } = require('../../data/index')

let nextBookId = 5

const getAllBooks = (req, res) => {
    res.status(200).send({ books: books })
}

const addBook = (req, res) => {
    const newBook = { id: nextBookId, ...req.body }
    nextBookId++
    books.push(newBook)

    res.status(201).send({ book: newBook })
}

const getBookById = (req, res) => {
    const searchedBook = books.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedBook) {
        res.sendStatus(404)
    }

    res.status(200).send({ book: searchedBook })
}

const deleteBookById = (req, res) => {
    const searchedBook = books.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedBook) {
        res.sendStatus(404)
    }

    books = books.filter((element) => {
        return !(element.id === Number(req.params['id']))
    })

    res.status(200).send({ book: searchedBook })
}

const updateBookById = (req, res) => {
    const searchedBook = books.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedBook) {
        res.sendStatus(404)
    }

    Object.keys(req.body).forEach((element) => {
        if (searchedBook[element]) {
            searchedBook[element] = req.body[element]
        }
    })

    res.status(200).send({ book: searchedBook })
}

module.exports = {
    getAllBooks,
    addBook,
    getBookById,
    deleteBookById,
    updateBookById,
}
