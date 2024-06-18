const data = require('../../../data/index.js')
const books = data.books


const getAllBooks = () => {
    return books
}

module.exports = {
    getAllBooks
}