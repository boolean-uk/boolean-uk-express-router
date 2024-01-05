const express = require("express");
const router = express.Router();
const data = require("../../data/index");
const films = data.films;

const doesTitleExist = (title, res) => {
  const foundFilm = films.find((film) => film.title === title);
  if (foundFilm)
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
};
const findFilmBy = (id, res) => {
    const idNum = parseInt(id);
    const foundFilm = films.find((film) => film.id === idNum);
    if (!foundFilm)
      return res
        .status(404)
        .json({ error: "A film with the provided ID does not exist" });
    return foundFilm;
  };

router.get("/", (req, res) => res.json({ films: films }));

router.post("/", (req, res) => {
  const id = films.length + 1;
  const newFilm = req.body;

  if (
    !newFilm.title ||
    !newFilm.director ||
    newFilm.title.length === 0 ||
    newFilm.director.length === 0
  ) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  doesTitleExist(newFilm.title, res);

  newFilm.id = id;
  films.push(newFilm);

  return res.status(201).json({ film: newFilm });
});

router.get("/:id", (req, res) => {
    const foundFilm = findFilmBy(req.params.id, res);
    return res.json({ film: foundFilm });
});

module.exports = router;
