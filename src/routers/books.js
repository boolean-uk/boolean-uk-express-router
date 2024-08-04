const express = require("express");

const router = express.Router();

const { books } = require("../../data/index");

let nextBookId = books.length + 1;

//FUNCTIONS

function getBookById(providedId) {
  const foundBook = books.find((book) => book.id == providedId);
  return foundBook;
}

function noBookErr(res) {
  return res.status(404).json({
    error: "A book the provided ID does not exist",
  });
}

function missingFieldsErr(res) {
  return res.status(400).json({
    error: "Missing fields in request body",
  });
}

function alreadyExistsErr(res) {
  return res.status(409).json({
    error: "A book with the provided title already exists",
  });
}

//GET ROUTES

router.get("/", (req, res) => {
  res.json({ books });
});

router.get("/:id", (req, res) => {
  const foundBook = getBookById(req.params.id);

  foundBook
    ? res.json({
        book: foundBook,
      })
    : noBookErr(res);
});

//POST ROUTES

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.type || !req.body.author) {
    missingFieldsErr(res);
  } else if (books.find((book) => book.title == req.body.title)) {
    alreadyExistsErr(res);
  } else {
    const newBook = { id: nextBookId, ...req.body };
    books.push(newBook);
    res.status(201).json({ book: newBook });
    nextBookId++;
  }
});

//DELETE ROUTES

router.delete("/:id", (req, res) => {
  const foundBook = getBookById(req.params.id);

  if (foundBook) {
    books.splice(books.indexOf(foundBook), 1);
    res.json({
      book: foundBook,
    });
  } else {
    noBookErr(res);
  }
});

//PUT ROUTES

router.put("/:id", (req, res) => {
  const foundBook = getBookById(req.params.id);
  if (!req.body.title || !req.body.type || !req.body.author) {
    missingFieldsErr(res);
  } else if (!foundBook) {
    noBookErr(res);
  } else if (books.find((book) => book.title == req.body.title)) {
    alreadyExistsErr(res);
  } else {
    let theBook = (books[books.indexOf(foundBook)] = {
      id: foundBook.id,
      ...req.body,
    });
    res.json({
      book: theBook,
    });
  }
});

module.exports = router;
