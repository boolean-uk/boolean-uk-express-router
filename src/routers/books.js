const books = require("../../data/index.js").books
// console.log(books)

const express = require("express")
const router = express.Router()

let idCount = 5

router.get("/", (req, res) => {
    res.status(200).json({
        books
    })
})

router.post("/", (req, res) => {
    const book = req.body
    book.id = idCount
    books.push(book)
    idCount++
    res.status(201).json({
        book
    })
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(book => book.id === id)
    res.status(200).json({
        book
    })
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    let index
    books.forEach((book, i) => {
        if (book.id === id) {
            index = i
        }
    })
    const removed = books.splice(index, 1)
    res.status(200).json({
        book: removed[0]
    })
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    let index
    books.forEach((book, i) => {
        if (book.id === id) {
            index = i
        }
    })
    const book = req.body
    book.id = id
    books.splice(index, 1, book)
    res.status(200).json({
        book
    })
})


module.exports = router