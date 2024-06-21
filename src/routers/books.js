const { all, get, create, update, remove } = require("../contollers/books");

const express = require("express");
const router = express.Router();

router.get("/", all);

router.post("/", create);

router.get("/:id", get);

router.put("/:id", update);

router.delete("/:id", remove);

router.patch("/:id", update);


module.exports = router;
