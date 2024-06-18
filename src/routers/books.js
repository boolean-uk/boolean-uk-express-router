const express = require('express')
const booksRouter = express.Router()
const { getAllBooks } = require('../controllers/booksControllers.js')


booksRouter.get("/", getAllBooks)

module.exports = booksRouter