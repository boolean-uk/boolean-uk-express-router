const {all, get} = require("../contollers/books")

const express = require("express");
const router = express.Router();

router.get("/", all);

router.post("/", (req, res) => {
    res.send({ books: books });
  });

router.get("/:id", get)


module.exports = router 