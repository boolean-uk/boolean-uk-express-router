const { all, get, create, update, remove, patch } = require("../contollers/films");

const express = require("express");
const router = express.Router();

router.get("/", all);

router.post("/", create);

router.get("/:id", get);

router.put("/:id", update);

router.delete("/:id", remove);

router.patch("/:id", patch);

module.exports = router;
