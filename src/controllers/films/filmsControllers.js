const { films } = require("../../../data/index.js")
const MissingDataError = require("../../errors/MissingDataError.js")
const ExistingDataError = require("../../errors/ExistingDataError.js")
const DataNotFoundError = require("../../errors/DataNotFoundError.js")
const {
  verifyFilmReqQuery,
  verifyFilmBody,
  verifyFilmTitle,
  addFilmToDb,
  findFilmById,
  removeFilmFromDb,
  replaceFilmInDb,
  verifyFilmReqBody,
  verifyMssingFields,
} = require("../../domain/films/filmsRepository.js")

const getFilms = (req, res) => {
  verifyFilmReqQuery(req, res)

  res.json({
    films: films,
  })
}

const postFilm = (req, res) => {
  verifyFilmBody(req)

  verifyFilmTitle(req)

  const film = { id: films.length + 1, ...req.body }

  addFilmToDb(film)

  res.status(201).json({
    film: film,
  })
}

const getFilmById = (req, res) => {
  const id = Number(req.params.id)
  const film = findFilmById(id)

  if (!film) {
    throw new DataNotFoundError("A film with provided ID does not exist")
  }

  res.json({
    film: film,
  })
}

const deleteFilm = (req, res) => {
  const id = Number(req.params.id)
  const film = findFilmById(id)

  if (!film) {
    throw new DataNotFoundError("A film with provided ID does not exist")
  }

  removeFilmFromDb(film)

  res.json({
    film: film,
  })
}

const updateFilm = (req, res) => {
  const id = Number(req.params.id)
  const film = findFilmById(id)

  if (!film) {
    throw new DataNotFoundError("A film with provided ID does not exist")
  }

  verifyFilmTitle(req)

  const updatedFilm = { id: film.id, ...req.body }

  replaceFilmInDb(film, updatedFilm)

  res.json({
    film: updatedFilm,
  })
}

const patchFilm = (req, res) => {
  verifyMssingFields(req)

  const id = Number(req.params.id)
  const film = findFilmById(id)

  if (!film) {
    throw new DataNotFoundError("A film with provided ID does not exist")
  }

  verifyFilmTitle(req)

  let updatedFilm = {}

  verifyFilmReqBody(req, updatedFilm, film)

  replaceFilmInDb(film, updatedFilm)

  res.json({
    film: updatedFilm,
  })
}

module.exports = {
  getFilms,
  postFilm,
  getFilmById,
  deleteFilm,
  updateFilm,
  patchFilm,
}
