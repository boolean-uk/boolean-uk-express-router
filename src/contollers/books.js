const { books } = require("../../data/index.js");

const all = (req, res) => {
    res.status(200).json({"books":books})
}

const get = (req, res) => {
    const id = Number(req.params.id)
    const found = books.find(book => book.id === id)
    res.status(200).json({book: found})
}

const create = (req, res) => {}
const update = (req, res)=>{}


module.exports = {
    all,
    get
}