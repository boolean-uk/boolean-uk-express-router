const { all, get, create, update, remove } = require("../contollers/films");

const express = require("express");
const router = express.Router();

router.get("/", all);

router.post("/", create);

router.get("/:id", get);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;
