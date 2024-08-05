const router = require("express").Router();
const data = require("../../data");

console.log(data)
// Write routes here...
let books = data.books
// Get all books
router.get('/', function (req, res) {
  res.status(200).json({
    books: books
  })
})


// Get a book by id
router.get('/:id', function (req, res) {
  const id = req.params.id;

  const book = books.find(function (book) {
    return book.id.toString() === id
  })

  res.status(200).json({
    book: book
  })
})

// Add a new book
router.post('/', function (req, res) {
  const book = req.body;

  // push new movie onto the array
  books.push(book);

  res.status(201).json({
    message: 'Added book succesffully'
  })
})

// delete book  by id
router.delete('/:id', function (req, res) {
  const id = req.params.id;

  books = books.filter(function (book) {
    return book.id.toString() !== id
  })

  res.status(200).json({
    message: `Deleted book ${id} successfully`
  })

})

// upadte book by id
router.put('/:id', function (req, res) {
    const id = req.params.id
    const updatedbook = req.body;
  
    // get index of movie to update
    const existingbookIndex = books.findIndex(function (book) {
      return book.id.toString() === id;
    })
  
    // update movie in array
    books[existingbookIndex] = updatedbook;
  
    res.status(200).json({
      message: `Updated movie ${books[existingbookIndex].id} successfully`
    })
  
  })

module.exports = router;