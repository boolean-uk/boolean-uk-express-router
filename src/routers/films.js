const router = require("express").Router();

let films = require("../../data/index.js").films;

let newFilmId = 4;

router.get("/", (req, res) => {
  if (req.query.director) {
    const director = req.query.director;
    const filteredFilms = films.filter((film) => film.director === director);

    res.status(200).json({ films: filteredFilms });
  }
  res.status(200).json({ films });
});

router.post("/", (req, res) => {
  const newFilm = req.body;

  if (!newFilm.title || !newFilm.director) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const matchedFilm = films.find((film) => film.title === newFilm.title);

  if (matchedFilm) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  } 

    newFilmId += 1;
    newFilm.id = newFilmId;

    films.push(newFilm);
    res.status(201).json({ film: newFilm });
  
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === id);

  if (!foundFilm) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }

  res.status(200).json({ film: foundFilm });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === id);

  if (!foundFilm) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }

  films = films.filter((film) => film.id !== foundFilm.id);

  res.status(200).json({ film: foundFilm });
});

router.put("/:id", (req, res) => {
  const updatedFilm = req.body;
  const id = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === id);

  if (!foundFilm) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }

  const matchedFilm = films.find((film) => film.title === updatedFilm.title);

  if (matchedFilm) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const existingFilmIndex = films.findIndex((film) => film.id === id);

  updatedFilm.id = id;

  films.splice(existingFilmIndex, 1, updatedFilm);

  res.status(200).json({ film: updatedFilm });
});

router.patch("/:id", (req, res) => {
  const updatedFilm = req.body;
  const id = Number(req.params.id);

  if (!updatedFilm.title) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const foundFilm = films.find((film) => film.id === id);

  if (!foundFilm) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }

  const matchedFilmTitle = films.find(
    (film) => film.title === updatedFilm.title
  );

  if (matchedFilmTitle) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const existingFilmIndex = films.findIndex((film) => film.id === id);

  films[existingFilmIndex] = {
    ...films[existingFilmIndex],
    ...updatedFilm,
  };

  res.status(200).json({ film: updatedFilm });
});

module.exports = router;
