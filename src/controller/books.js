const { books: books } = require('../../data/index')

const getAllBooks = (req, res) => {
    res.status(200).json({
        books: books
    })
}


module.exports = { getAllBooks }