const express = require("express");
const router = express.Router();

let { books } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.status(200).json({ books: books });
});

router.post("/", function (req, res) {
  const { title, type, author } = req.body;
  if (!title || !type || !author) {
    return res.status(400).json({ error: "error" });
  }
  const currentHighId = books.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
  const newBook = {
    id: currentHighId + 1,
    title,
    type,
    author,
  };
  console.log(req.body);
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

router.get("/:id", function (req, res) {
  const toFind = parseInt(req.params.id, 10);
  const index = books.findIndex((obj) => obj.id === toFind);
  const foundBook = books[index];
  if (foundBook) {
    res.status(200).json({ book: foundBook });
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", function (req, res) {
  const toRemove = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((obj) => obj.id === toRemove);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books[bookIndex];
  books = books.filter((obj) => obj.id !== toRemove);

  res.status(200).json({ book: deletedBook });
});

router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const { title, type, author, pages } = req.body;
  const updatedBook = {
    ...books[bookIndex],
    title,
    type,
    author,
    pages,
  };
  books[bookIndex] = updatedBook;

  res.status(200).json({ book: updatedBook });
});

module.exports = router;
