const data = require("../../data/index.js");
const films = data.films;
let idCounter = 5;
const { MissingFieldsError, DataAlreadyExistsError, DataNotFoundError } = require('../errors/errors.js')

function getAllFilms(req, res) {
  res.status(200).json({ films });
}

function createFilm(req, res) {
  const film = req.body;
  if (!film.title || !film.director) {
    throw new MissingFieldsError('Missing fields in request body')
  }
  if (films.find((f) => f.title === film.title)) {
    throw new DataAlreadyExistsError('A film with the provided title already exists')
  }
  film.id = idCounter;
  films.push(film);
  idCounter++;
  res.status(201).json({ film });
}

function getFilmById(req, res) {
  const filmId = Number(req.params.id);
  const film = films.find((film) => film.id === filmId);
  if (!film) {
    throw new DataNotFoundError('A film with provided ID does not exist')
  }
  res.status(200).json({ film });
}

function deleteFilmById(req, res) {
  const filmId = Number(req.params.id);
  const film = films.find((film) => film.id === filmId);
  const index = films.indexOf(film);
  films.splice(index, 1);
  res.status(200).json({ film });
}

function updateFilmById(req, res) {
  const updatedParameters = req.body;
  const filmId = Number(req.params.id);
  const film = films.find((film) => film.id === filmId);
  Object.assign(film, updatedParameters);
  res.status(200).json({ film });
}

module.exports = {
  getAllFilms,
  createFilm,
  getFilmById,
  deleteFilmById,
  updateFilmById,
};
