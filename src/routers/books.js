const express = require("express");

const router = express.Router();

const { books } = require("../../data/index");

let nextBookId = books.length + 1;

//FUNCTIONS

function getBookById(providedId) {
  const foundBook = books.find((book) => book.id == providedId);
  return foundBook;
}

//GET ROUTES

router.get("/", (req, res) => {
  res.json({ books });
});

router.get("/:id", (req, res) => {
  const foundBook = getBookById(req.params.id);
  res.json({
    book: foundBook,
  });
});

//POST ROUTES

router.post("/", (req, res) => {
  const newBook = { id: nextBookId, ...req.body };
  books.push(newBook);
  res.status(201).json({ book: newBook });
  nextBookId++;
});

//DELETE ROUTES

router.delete("/:id", (req, res) => {
  const foundBook = getBookById(req.params.id);
  books.splice(books.indexOf(foundBook), 1);
  res.json({
    book: foundBook,
  });
});

//PUT ROUTES

router.put("/:id", (req, res) => {
  const foundBook = getBookById(req.params.id);

  let theBook = (books[books.indexOf(foundBook)] = {
    id: foundBook.id,
    ...req.body,
  });
  res.json({
    book: theBook,
  });
});

module.exports = router;
