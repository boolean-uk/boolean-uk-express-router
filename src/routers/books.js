const express = require("express");
const router = express.Router();

const getBooks = require("../../data/index.js");
const bookData = require("../../test/fixtures/bookData.js");

const books = getBooks.books;

router.get("/", (req, res) => {
  res.json({
    books,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  res.json({
    book,
  });
});

router.post("/", (req, res) => {
  const book = bookData.book1;
  res.status(201).json({
    book,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  book.title = bookData.book3.title;
  book.type = bookData.book3.type;
  book.author = bookData.book3.author;

  res.json({
    book,
  });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);

  res.json({ book: deletedBook });
});

module.exports = router;
