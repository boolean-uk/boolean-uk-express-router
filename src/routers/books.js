// Import data here...
const { books } = require("../../data");

const express = require("express");
const router = express.Router();


// Write routes here...
router.get("/", (req, res) => {
    res.send({ books: books });
  });
  
  module.exports = router 