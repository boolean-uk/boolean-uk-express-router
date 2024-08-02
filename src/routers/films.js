const express = require("express");
const router = express.Router();

let { films } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.status(200).json({ films: films });
});

router.post("/", function (req, res) {
  const { title, director } = req.body;
  if (!title || !director) {
    return res.status(400);
  }
  const currentHighId = films.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
  req.body.id = currentHighId + 1;
  films.push(req.body);
  res.status(201).json({ film: req.body });
});

router.get("/:id", function (req, res) {
  const toFind = parseInt(req.params.id, 10);
  const index = films.findIndex((obj) => obj.id === toFind);
  const foundFilm = films[index];
  if (foundFilm) {
    res.send({ film: foundFilm });
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", function (req, res) {
  const toRemove = parseInt(req.params.id, 10);
  const filmIndex = films.findIndex((obj) => obj.id === toRemove);
  if (filmIndex === -1) {
    return res.status(404).json({ error: "Film not found" });
  }

  const deletedFilm = films[filmIndex];
  films = films.filter((obj) => obj.id !== toRemove);

  res.status(200).json({ film: deletedFilm });
});

router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const filmIndex = films.findIndex((film) => film.id === id);
  if (filmIndex === -1) {
    return res.status(404).json({ error: "Film not found" });
  }

  const { title, director } = req.body;
  const updatedFilm = {
    ...films[filmIndex],
    title,
    director,
  };
  films[filmIndex] = updatedFilm;

  res.status(200).json({ film: updatedFilm });
});

module.exports = router;
