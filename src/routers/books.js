const express = require('express')
const booksRouter = express.Router()
const { getAllBooks, createBook, getBookById } = require('../controllers/booksControllers.js')


booksRouter.get("/", getAllBooks)
booksRouter.post("/", createBook)
booksRouter.get("/:id", getBookById)

module.exports = booksRouter