const express = require("express")
const {
  getFilms,
  postFilm,
  getFilmById,
  deleteFilm,
  updateFilm,
  patchFilm,
} = require("../controllers/filmsControllers")
const router = express.Router()

router.get("/", getFilms)

router.post("/", postFilm)

router.get("/:id", getFilmById)

router.delete("/:id", deleteFilm)

router.put("/:id", updateFilm)

router.patch("/:id", patchFilm)

module.exports = router
