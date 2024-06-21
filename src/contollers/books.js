const { books } = require("../../data/index.js");
const {
  MissingFieldError,
  DataError,
  NotFoundError,
} = require("../errors/index.js");

let bookID = books.length + 1;

const all = (req, res) => {
  res.status(200).json({ books: books });
};

const get = (req, res) => {
  const id = Number(req.params.id);
  const found = books.find((book) => book.id === id);

  if (!found) {
    res.status(404).send({ error: "A book the provided ID does not exist" });
    throw new NotFoundError("A book the provided ID does not exist");
  }

  res.status(200).json({ book: found });
};

const create = (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.type) {
    res.status(400).send({ error: `Missing fields in request body` });
    throw new MissingFieldError(`Missing fields in request body`);
  }

  if (books.find((book) => book.title === newBook.title)) {
    res
      .status(409)
      .send({ error: `A book with the provided title already exists` });
    throw new MissingFieldError(
      `A book with the provided title already exists`
    );
  }
  newBook.id = bookID;
  books.push(newBook);
  bookID++;
  res.status(201).json({ book: newBook });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  if (!updates.title || !updates.author || !updates.type) {
    res.status(400).send({ error: `Missing fields in request body` });
    throw new MissingFieldError(`Missing fields in the request body`);
  }

  const found = books.find((book) => book.id === id);
  if (!found) {
    res.status(404).send({ error: `A book the provided ID does not exist` });
    throw new NotFoundError(`A book with the provided ID does not exist`);
  }

  if (books.find((book) => book.title === updates.title)) {
    res.status(409).send({ error: `A book with the provided title already exists` });
    throw new MissingFieldError(
      `A book with the provided title already exists`
    );
  }

  const index = books.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ book: updated });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const found = books.find((book) => book.id === id);
  if (!found) {
    res.status(404).send({ error: `A book the provided ID does not exist` });
    throw new NotFoundError(`Book with the provided ID does not exist`);
  }

  const index = books.indexOf(found);
  books.splice(index, 1);
  res.status(200).json({ book: found });
};

module.exports = {
  all,
  get,
  create,
  update,
  remove,
};
