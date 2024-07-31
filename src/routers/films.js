const router = require("express").Router();

let films = require("../../data/index.js").films;

let newFilmId = 4;

router.get("/", (req, res) => {
  res.status(200).json({ films });
});

router.post("/", (req, res) => {
  const film = req.body;
  newFilmId += 1;
  film.id = newFilmId;

  films.push(film);
  res.status(201).json({ film });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === id);

  res.status(200).json({ film: foundFilm });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === id);

  films = films.filter((film) => film.id !== foundFilm.id);

  res.status(200).json({ film: foundFilm });
});

router.put("/:id", (req, res) => {
  const updatedFilm = req.body;
  const id = Number(req.params.id);

  const existingFilmIndex = films.findIndex((film) => film.id === id);

  updatedFilm.id = id;

  films.splice(existingFilmIndex, 1, updatedFilm);

  res.status(200).json({ film: updatedFilm });
});

router.patch("/:id", (req, res) => {
  const updatedFilm = req.body;
  const id = Number(req.params.id);

  const existingFilmIndex = films.findIndex((film) => film.id === id);

  films[existingFilmIndex] = {
    ...films[existingFilmIndex],
    ...updatedFilm,
  };

  res.status(200).json({ film: updatedFilm });
});


module.exports = router;