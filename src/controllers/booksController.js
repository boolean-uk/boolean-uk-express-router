const Joi = require("joi");
const { books } = require("../../data/index");

function findBook(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const book = books.find((book) => book.id === id);

  return { book, id };
}

function validateBook(req, res) {
  const schema = {
    title: Joi.string().required(),
    type: Joi.string().required(),
    author: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

exports.getAllBooks = (req, res) => {
  res.status(200).json({ books });
};

exports.createBook = (req, res) => {
  const isExisted = books.find((book) => book.title === req.body.title);
  if (isExisted)
    return res.status(409).send("A book with provided title already exists");

  const { error } = validateBook(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const id = books[books.length - 1].id + 1;
  const newBook = { id, ...req.body };

  books.push(newBook);
  res.status(201).json({ book: newBook });
};

exports.getBook = (req, res) => {
  const { book, id } = findBook(req, res);
  if (!book)
    return res.status(404).send(`The book with ID ${id} is not found.`);

  res.status(200).json({ book });
};

exports.deleteBook = (req, res) => {
  const { book, id } = findBook(req, res);
  if (!book)
    return res.status(404).send(`The book with ID ${id} is not found.`);

  books.splice(books.indexOf(book), 1);

  res.status(200).json({ book });
};

exports.updateBook = (req, res) => {
  const { book, id } = findBook(req, res);
  if (!book)
    return res.status(404).send(`The book with ID ${id} is not found.`);

  const isExisted = books.find((book) => book.title === req.body.title);
  if (isExisted)
    return res.status(409).send("A book with provided title already exists");

  const { error } = validateBook(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  book.title = req.body.title;
  book.type = req.body.type;
  book.author = req.body.type;

  res.status(200).json({ book });
};
