const express = require("express");
const booksRouter = express.Router();
const {
  getAllBooks,
  createBook,
  getBookById,
  deleteBookById,
  updateBookById,
} = require("../controllers/booksControllers.js");

booksRouter.get("/", getAllBooks);
booksRouter.post("/", createBook);
booksRouter.get("/:id", getBookById);
booksRouter.delete("/:id", deleteBookById);
booksRouter.put("/:id", updateBookById);

module.exports = booksRouter;
