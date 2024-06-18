const data = require("../../data/index.js");
const books = data.books;
let idCounter = 5;

function getAllBooks(req, res) {
  res.status(200).json({ books });
}

module.exports = { getAllBooks };
