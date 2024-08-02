const express = require("express");
const router = express.Router();

const books = [
  { id: 1, title: "1984", type: "fiction", author: "George Orwell", pages: 5 },
  {
    id: 2,
    title: "Life of Pi",
    type: "fiction",
    author: "Yann Martel",
    pages: 4,
  },
  {
    id: 3,
    title: "How to Win Friends and Influence People",
    type: "non-fiction",
    author: "Dale Carnegie",
    pages: 3,
  },
  {
    id: 4,
    title: "The Lean Startup",
    type: "non-fiction",
    author: "Eric Reis",
    pages: 2,
  },
];

// Endpoint to get all books
router.get("/", (req, res) => {
  res.json({ books });
});

// Endpoint to get a book by ID
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res
      .status(404)
      .send({ error: "A book the provided ID does not exist" });
  }
  res.json({ book });
});

// Endpoint to create a new book
router.post("/", (req, res) => {
  const { title, type, author, pages } = req.body;
  if (!title || !type || !author || pages === undefined) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
  const existingBook = books.find((b) => b.title === title);
  if (existingBook) {
    return res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  }
  const newBook = {
    id: books.length + 1,
    title,
    type,
    author,
    pages,
  };
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

// Endpoint to update a book by ID
router.put("/:id", (req, res) => {
  const { title, type, author, pages } = req.body;
  if (!title || !type || !author || pages === undefined) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res
      .status(404)
      .send({ error: "A book with the provided ID does not exist" });
  }
  const existingBook = books.find((b) => b.title === title && b.id !== book.id);
  if (existingBook) {
    return res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  }
  Object.assign(book, req.body);
  res.status(200).json({ book });
});

// Endpoint to partially update a book by ID
router.patch("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res
      .status(404)
      .send({ error: "A book with the provided ID does not exist" });
  }
  if (req.body.title) {
    const existingBook = books.find(
      (b) => b.title === req.body.title && b.id !== book.id
    );
    if (existingBook) {
      return res
        .status(409)
        .send({ error: "A book with the provided title already exists" });
    }
  }
  Object.assign(book, req.body);
  res.status(200).json({ book });
});

// Endpoint to delete a book by ID
router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res
      .status(404)
      .send({ error: "A book the provided ID does not exist" });
  }
  const deletedBook = books.splice(bookIndex, 1);
  res.status(200).json({ book: deletedBook[0] });
});

module.exports = router;
