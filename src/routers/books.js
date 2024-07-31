const router = require("express").Router();
// Import data here...
let books = require("../../data/index.js").books;

// Write routes here...
let newBookId = 4;

router.get("/", (req, res) => {
  res.status(200).json({ books });
});

router.post("/", (req, res) => {
  const newBook = req.body;
  // const requiredProperties = ["title", "type", "author", "pages"];

  // for (const item of requiredProperties) {
  //   if (newBook[item] === undefined) {
  //     return res
  //       .status(400)
  //       .json({ error: "Missing fields in request body" });
  //   }
  // }

    if (!newBook.title ||  !newBook.author || !newBook.type) {
       res.status(400).json({ error: "Missing fields in request body" });
    }

  const matchedBook = books.find((book) => book.title === newBook.title);

  if (matchedBook) {
     res.status(409).json({ error: "A book with the provided title already exists" });
  } else {
    newBookId += 1;
    newBook.id = newBookId;
    books.push(newBook);
    res.status(201).json({ newBook });
  }
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) {
    res
      .status(404)
      .json({ error: "A book the provided ID does not exist" });
  }

  res.status(200).json({ book: foundBook });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) {
    res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  books = books.filter((book) => book.id !== foundBook.id);

  res.status(200).json({ book: foundBook });
});

router.put("/:id", (req, res) => {
  const updatedBook = req.body;
  const id = Number(req.params.id);
   if (
     !updatedBook.title ||
     !updatedBook.author ||
     !updatedBook.type
   ) {
     res.status(400).json({ error: "Missing fields in request body" });
   }

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) {
    res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  const matchedBookTitle = books.find(
    (book) => book.title === updatedBook.title
  );

  if (matchedBookTitle) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  const existingBookIndex = books.findIndex((book) => book.id === id);

  updatedBook.id = id;

  books.splice(existingBookIndex, 1, updatedBook);

  res.status(200).json({ book: updatedBook });
});

router.patch("/:id", (req, res) => {
  const updatedBook = req.body;
  const id = Number(req.params.id);

  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) {
    res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  const matchedBookTitle = books.find(
    (book) => book.title === updatedBook.title
  );

  if (matchedBookTitle) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  } 

  const existingBookIndex = books.findIndex((book) => book.id === id);

  books[existingBookIndex] = {
    ...books[existingBookIndex],
    ...updatedBook,
  };

  return res.status(400).json({ book: updatedBook });

});

module.exports = router;
