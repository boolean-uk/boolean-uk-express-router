const express = require("express");
const filmsController = require("../controllers/filmsController");
const router = express.Router();

router
  .route("/")
  .get(filmsController.getAllFilms)
  .post(filmsController.createFilm);
router
  .route("/:id")
  .get(filmsController.getFilm)
  .delete(filmsController.deleteFilm)
  .put(filmsController.updateFilm);

module.exports = router;
