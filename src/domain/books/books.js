const data = require('../../../data/index.js')
const books = data.books


const getAllBooks = () => {
    return books
}

const getBookByID = (id) => {
    return getAllBooks().find((b) => b.id === id)
}

module.exports = {
    getAllBooks,
    getBookByID
}