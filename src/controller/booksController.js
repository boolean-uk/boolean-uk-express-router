const { books } = require('../../data/index.js')

const getAll = (req, res) => {
  res.status(200).json({books})
}

const createBook = (req, res) => {
  const {title, type, author} = req.body
  const id = books[books.length-1].id + 1
  
  const newBook = {id, title, type, author}
  books.push(newBook)
  res.status(201).json({book : newBook})
}

const GetBookById = (req, res) => {
  const id = Number(req.params.id)
  const found = books.find(b => b.id === id)

  if(found === undefined) {
    return res.status(404).json({mesasage : "Didnt find the Book!"})
  }
  res.status(200).json({book : found})
}

const deleteById = (req, res) => {
  const id = Number(req.params.id)
  const bookIndex = books.findIndex(b => b.id === id)

  if(bookIndex === -1) {
    return res.status(404).json({message : 'The Book dose not exist!'})
  }
  const deletedBook = books.splice(bookIndex, 1)
  res.status(200).json({book : deletedBook[0]})
}

const updateBookById = (req, res) => {
  const id = Number(req.params.id)
  const {title, type, author} = req.body
  const bookIndex = books.findIndex(f => f.id === id)

  if(bookIndex === -1) {
    return res.status(404).json({message : 'The Book dose not exist!'})
  }
  books[bookIndex] = {id, title, type, author}
  res.status(200).json({book : books[bookIndex]})
}


module.exports = { getAll, createBook, GetBookById, deleteById, updateBookById }