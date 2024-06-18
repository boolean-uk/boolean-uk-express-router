const { Router } = require("express");
const { getAll, addFilm } = require("../controllers/films/films");

const router = Router()

router.get('/', getAll)

router.post('/', addFilm)

module.exports = router