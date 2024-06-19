const { books } = require("../../data/index.js");

let bookID = books.length + 1;

const all = (req, res) => {
  res.status(200).json({ books: books });
};

const get = (req, res) => {
  const id = Number(req.params.id);
  const found = books.find((book) => book.id === id);
  res.status(200).json({ book: found });
};

const create = (req, res) => {
  const newBook = req.body;
  newBook.id = bookID;
  books.push(newBook);
  bookID++;
  res.status(201).json({ book: newBook });
};

const update = (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body
    const found = books.find((book) => book.id === id);
    const index = books.indexOf(found)
    const updated = {...found, ...updates}
    res.status(200).json({book: updated})
};

const remove = (req, res) => {
    const id = Number(req.params.id);
    const found = books.find((book) => book.id === id);
    const index = books.indexOf(found)
    books.splice(index, 1)
    res.status(200).json({book: found})

};

module.exports = {
  all,
  get,
  create,
  update,
  remove
};
