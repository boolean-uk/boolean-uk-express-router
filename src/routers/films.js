const express = require("express");

const router = express.Router();

const { films } = require("../../data/index");

let nextFilmId = films.length + 1;

//FUNCTIONS

function getFilmById(providedId) {
  const foundFilm = films.find((film) => film.id == providedId);
  return foundFilm;
}

//GET ROUTES

router.get("/", (req, res) => {
  res.json({ films });
});

router.get("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);
  res.json({
    film: foundFilm,
  });
});

//POST ROUTES

router.post("/", (req, res) => {
  const newFilm = { id: nextFilmId, ...req.body };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
  nextFilmId++;
});

//DELETE ROUTES

router.delete("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);
  films.splice(films.indexOf(foundFilm), 1);
  res.json({
    film: foundFilm,
  });
});

//PUT ROUTES

router.put("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);

  let theFilm = (films[films.indexOf(foundFilm)] = {
    id: foundFilm.id,
    ...req.body,
  });
  res.json({
    film: theFilm,
  });
});

module.exports = router;
