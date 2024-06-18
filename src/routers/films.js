const express = require("express");
const filmsRouter = express.Router();
const {
  getAllFilms,
  createFilm,
  getFilmById,
  deleteFilmById,
  updateFilmById,
  getFilmByDirector,
  patchFilmById
} = require("../controllers/filmsControllers.js");

filmsRouter.get("/", (req, res) => {
  if (req.query.director) {
    return getFilmByDirector(req, res);
  } else {
    return getAllFilms(req, res);
  }
});
filmsRouter.post("/", createFilm);
filmsRouter.get("/:id", getFilmById);
filmsRouter.delete("/:id", deleteFilmById);
filmsRouter.put("/:id", updateFilmById);
filmsRouter.patch("/:id", patchFilmById)

module.exports = filmsRouter;
