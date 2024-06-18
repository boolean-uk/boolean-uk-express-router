const { films } = require("../../data")
const MissingDataError = require("../errors/MissingDataError")
const ExistingDataError = require("../errors/ExistingDataError")
const DataNotFound = require("../errors/DataNotFound")

const getFilms = (req, res) => {
  if (req.query.director) {
    const directorName = req.query.director.split(" ").join("").toLowerCase()
    const directorFilms = films.filter(
      (f) => f.director.split(" ").join("").toLowerCase() === directorName
    )

    return res.json({
      films: directorFilms,
    })
  }

  res.json({
    films: films,
  })
}

const postFilm = (req, res) => {
  if (!req.body.title || !req.body.director) {
    throw new MissingDataError("Missing fields in request body")
  }

  const existingFilm = films.find((f) => f.title === req.body.title)

  if (existingFilm) {
    throw new ExistingDataError(
      "A film with the provided title already exists"
    )
  }

  const film = { id: films.length + 1, ...req.body }

  films.push(film)

  res.status(201).json({
    film: film,
  })
}

const getFilmById = (req, res) => {
  const id = Number(req.params.id)
  const film = films.find((f) => f.id === id)

  if (!film) {
    throw new DataNotFound("A film with provided ID does not exist")
  }

  res.json({
    film: film,
  })
}

const deleteFilm = (req, res) => {
  const id = Number(req.params.id)
  const film = films.find((f) => f.id === id)

  if (!film) {
    throw new DataNotFound("A film with provided ID does not exist")
  }

  films.splice(films.indexOf(film), 1)

  res.json({
    film: film,
  })
}

const updateFilm = (req, res) => {
  const id = Number(req.params.id)
  const film = films.find((f) => f.id === id)

  if (!film) {
    throw new DataNotFound("A film with provided ID does not exist")
  }

  const existingFilm = films.find((f) => f.title === req.body.title)

  if (existingFilm) {
    throw new ExistingDataError(
      "A film with the provided title already exists"
    )
  }

  const updatedFilm = { id: film.id, ...req.body }

  films.splice(films.indexOf(film), 1, updatedFilm)

  res.json({
    film: updatedFilm,
  })
}

const patchFilm = (req, res) => {
  if (!req.body.title && !req.body.director) {
    throw new MissingDataError("Missing fields in the request body")
  }

  const id = Number(req.params.id)
  const film = films.find((f) => f.id === id)

  if (!film) {
    throw new DataNotFound("A film with provided ID does not exist")
  }

  const existingFilm = films.find((f) => f.title === req.body.title)

  if (existingFilm) {
    throw new ExistingDataError(
      "A film with the provided title already exists"
    )
  }

  let updatedFilm = {}

  if (!req.body.title && req.body.director) {
    updatedFilm = { id: film.id, title: film.title, ...req.body }
  }

  if (req.body.title && !req.body.director) {
    updatedFilm = { id: film.id, ...req.body, director: film.director }
  }

  films.splice(films.indexOf(film), 1, updatedFilm)

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
