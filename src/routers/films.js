const { Router } = require("express");
const { getAll, addFilm, getByID, removeFIlm, updateFilm } = require("../controllers/films/films");

const router = Router()

router.get('/', getAll)

router.post('/', addFilm)

router.get('/:id', getByID)

router.delete('/:id', removeFIlm)

router.put('/:id', updateFilm)

module.exports = router