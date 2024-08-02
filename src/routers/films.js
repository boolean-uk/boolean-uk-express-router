const express = require("express");
const router = express.Router();

const films = [
  { id: 1, title: "Bonnie and Clyde", director: "Arthur Penn" },
  { id: 2, title: "Reservoir Dogs", director: "Quentin Tarantino" },
  { id: 3, title: "Inception", director: "Christopher Nolan" },
  { id: 4, title: "Django Unchained", director: "Quentin Tarantino" },
];

// Endpoint to get all films or filter by director
router.get("/", (req, res) => {
  const { director } = req.query;
  if (director) {
    const directorFilms = films.filter(
      (f) => f.director.toLowerCase() === director.toLowerCase()
    );
    res.json({ films: directorFilms });
  } else {
    res.json({ films });
  }
});

// Endpoint to get a film by ID
router.get("/:id", (req, res) => {
  const film = films.find((f) => f.id === parseInt(req.params.id));
  if (!film) {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }
  res.json({ film });
});

// Endpoint to create a new film
router.post("/", (req, res) => {
  const { title, director } = req.body;
  if (!title || !director) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
  const existingFilm = films.find((f) => f.title === title);
  if (existingFilm) {
    return res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
  }
  const newFilm = {
    id: films.length + 1,
    title,
    director,
  };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

// Endpoint to update a film by ID
router.put("/:id", (req, res) => {
  const { title, director } = req.body;
  if (!title || !director) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
  const film = films.find((f) => f.id === parseInt(req.params.id));
  if (!film) {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }
  const existingFilm = films.find((f) => f.title === title && f.id !== film.id);
  if (existingFilm) {
    return res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
  }
  Object.assign(film, req.body);
  res.status(200).json({ film });
});

// Endpoint to partially update a film by ID
router.patch("/:id", (req, res) => {
  const film = films.find((f) => f.id === parseInt(req.params.id));
  if (!film) {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }
  if (req.body.title) {
    const existingFilm = films.find(
      (f) => f.title === req.body.title && f.id !== film.id
    );
    if (existingFilm) {
      return res
        .status(409)
        .send({ error: "A film with the provided title already exists" });
    }
  }
  Object.assign(film, req.body);
  res.status(200).json({ film });
});

// Endpoint to delete a film by ID
router.delete("/:id", (req, res) => {
  const filmIndex = films.findIndex((f) => f.id === parseInt(req.params.id));
  if (filmIndex === -1) {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }
  const deletedFilm = films.splice(filmIndex, 1);
  res.status(200).json({ film: deletedFilm[0] });
});

module.exports = router;
