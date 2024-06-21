const { Router } = require("express");
const { getAll, addFilm, getByID, removeFIlm, updateFilm, filterByDirector } = require("../controllers/films/films");

const router = Router()

router.get('/', getAll)
router.post('/', addFilm)
router.get('/:id', getByID)
router.delete('/:id', removeFIlm)
router.put('/:id', updateFilm)
router.get('/?director=:name', filterByDirector)

module.exports = router