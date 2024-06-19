const express = require("express");
const router = express.Router();

const getFilms = require("../../data/index.js");
const filmData = require("../../test/fixtures/filmData.js");

const films = getFilms.films;

router.get("/", (req, res) => {
  res.json({
    films,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);

  res.json({
    film,
  });
});

router.post("/", (req, res) => {
  const film = filmData.film1;
  film.id = 5;
  res.status(201).json({
    film,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);

  film.title = filmData.film2.title;
  film.type = filmData.film2.type;
  film.director = filmData.film2.director;

  res.json({
    film,
  });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmIndex = films.findIndex((film) => film.id === id);

  const deletedFilm = films[filmIndex];
  films.splice(filmIndex, 1);

  res.json({ film: deletedFilm });
});

module.exports = router;
