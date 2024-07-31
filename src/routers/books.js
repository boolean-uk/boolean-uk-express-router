const router = require("express").Router();
// Import data here...
let books = require("../../data/index.js").books;

// Write routes here...
let newBookId = 4;

router.get("/", (req, res) => {
  res.status(200).json({ books });
});

router.post("/", (req, res) => {
  const book = req.body;
  newBookId += 1;
  book.id = newBookId;

  books.push(book);
  res.status(201).json({ book });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundBook = books.find((book) => book.id === id);

  res.status(200).json({ book: foundBook });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundBook = books.find((book) => book.id === id);

  books = books.filter((book) => book.id !== foundBook.id);

  res.status(200).json({ book: foundBook });
});

router.put("/:id", (req, res) => {
  const updatedBook = req.body;
  const id = Number(req.params.id);

  const existingBookIndex = books.findIndex((book) => book.id === id);

  updatedBook.id = id;

  books.splice(existingBookIndex, 1, updatedBook);

  res.status(200).json({ book: updatedBook });
});

router.patch("/:id", (req, res) => {
    const updatedBook = req.body;
    const id = Number(req.params.id);

    const existingBookIndex = books.findIndex((book) => book.id === id);

    books[existingBookIndex] = {
   ...books[existingBookIndex],
   ...updatedBook,
 };

 res.status(200).json({ book: updatedBook });

});

module.exports = router;