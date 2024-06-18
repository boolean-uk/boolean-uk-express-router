let { books } = require('../../data/index')
const {MissingFieldsError, NotFoundError, AlreadyExistsError} = require('../errors/errors')

let nextBookId = 5

const getAllBooks = (req, res) => {
    res.status(200).send({ books: books })
}

const addBook = (req, res) => {
    if(!req.body.title || !req.body.type || !req.body.author) {
        throw new MissingFieldsError('Missing fields in request body')
    }
    
    const alreadyExists = books.find((element) => {
        return element.title === req.body.title
    })

    if(alreadyExists) {
        throw new AlreadyExistsError('A book with the provided title already exists')
    }
    
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
        throw new NotFoundError('A book the provided ID does not exist')
    }

    res.status(200).send({ book: searchedBook })
}

const deleteBookById = (req, res) => {
    const searchedBook = books.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedBook) {
        throw new NotFoundError('A book the provided ID does not exist')
    }

    books = books.filter((element) => {
        return !(element.id === Number(req.params['id']))
    })

    res.status(200).send({ book: searchedBook })
}

const updateBookById = (req, res) => {
    if(!req.body.title || !req.body.type || !req.body.author) {
        throw new MissingFieldsError('Missing fields in request body')
    }
    
    const searchedBook = books.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedBook) {
        throw new NotFoundError('A book the provided ID does not exist')
    }

    const alreadyExists = books.find((element) => {
        return element.title === req.body.title
    })

    if(alreadyExists) {
        throw new AlreadyExistsError('A book with the provided title already exists')
    }

    Object.keys(req.body).forEach((element) => {
        if (searchedBook[element]) {
            searchedBook[element] = req.body[element]
        }
    })

    res.status(200).send({ book: searchedBook })
}

const patchBookById = (req, res) => {
    const searchedBook = books.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedBook) {
        throw new NotFoundError('A book the provided ID does not exist')
    }

    const alreadyExists = books.find((element) => {
        return element.title === req.body.title
    })

    if(alreadyExists) {
        throw new AlreadyExistsError('A book with the provided title already exists')
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
    patchBookById,
}
