const express = require("express");
const booksController = require("../controllers/booksController");
const router = express.Router();

router
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.createBook);
router
  .route("/:id")
  .get(booksController.getBook)
  .delete(booksController.deleteBook)
  .put(booksController.updateBook);

module.exports = router;
