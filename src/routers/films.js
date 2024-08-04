const express = require("express");

const router = express.Router();

const { films } = require("../../data/index");

let nextFilmId = films.length + 1;

//FUNCTIONS

function getFilmById(providedId) {
  const foundFilm = films.find((film) => film.id == providedId);
  return foundFilm;
}

function noFilmErr(res) {
  return res.status(404).json({
    error: "A film with provided ID does not exist",
  });
}

function missingFieldsErr(res) {
  return res.status(400).json({
    error: "Missing fields in request body",
  });
}

function alreadyExistsErr(res) {
  return res.status(409).json({
    error: "A film with the provided title already exists",
  });
}

//GET ROUTES

router.get("/", (req, res) => {
  if (req.query.director) {
    res.json({
      films: films.filter((film) => film.director == req.query.director),
    });
  } else {
    res.json({ films });
  }
});

router.get("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);

  foundFilm
    ? res.json({
        film: foundFilm,
      })
    : noFilmErr(res);
});

//POST ROUTES

router.post("/", (req, res) => {
  if (!req.body.title) {
    missingFieldsErr(res);
  } else if (films.find((film) => film.title == req.body.title)) {
    alreadyExistsErr(res);
  } else {
    const newFilm = { id: nextFilmId, ...req.body };
    films.push(newFilm);
    res.status(201).json({ film: newFilm });
    nextFilmId++;
  }
});

//DELETE ROUTES

router.delete("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);

  if (foundFilm) {
    films.splice(films.indexOf(foundFilm), 1);
    res.json({
      film: foundFilm,
    });
  } else {
    noFilmErr(res);
  }
});

//PUT ROUTES

router.put("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);
  if (!req.body.title || !req.body.director) {
    missingFieldsErr(res);
  } else if (!foundFilm) {
    noFilmErr(res);
  } else if (films.find((film) => film.title == req.body.title)) {
    alreadyExistsErr(res);
  } else {
    let theFilm = (films[films.indexOf(foundFilm)] = {
      id: foundFilm.id,
      ...req.body,
    });
    res.json({
      film: theFilm,
    });
  }
});

router.patch("/:id", (req, res) => {
  const foundFilm = getFilmById(req.params.id);
  if (!foundFilm) {
    noFilmErr(res);
  } else if (films.find((film) => film.title == req.body.title)) {
    alreadyExistsErr(res);
  } else {
    let theFilm = (films[films.indexOf(foundFilm)] = {
      id: foundFilm.id,
      ...req.body,
    });
    res.json({
      film: theFilm,
    });
  }
});

module.exports = router;
