const { films } = require("../../../data/index.js")
const MissingDataError = require("../../errors/MissingDataError.js")
const ExistingDataError = require("../../errors/ExistingDataError.js")

const verifyFilmReqQuery = (req, res) => {
  if (req.query.director) {
    const directorName = req.query.director.split(" ").join("").toLowerCase()
    const directorFilms = films.filter(
      (f) => f.director.split(" ").join("").toLowerCase() === directorName
    )

    return res.json({
      films: directorFilms,
    })
  }
}

const verifyFilmBody = (req) => {
  if (!req.body.title || !req.body.director) {
    throw new MissingDataError("Missing fields in request body")
  }
}

const verifyFilmTitle = (req) => {
  const existingFilm = films.find((f) => f.title === req.body.title)

  if (existingFilm) {
    throw new ExistingDataError(
      "A film with the provided title already exists"
    )
  }
}

const addFilmToDb = (film) => {
  films.push(film)
}

const findFilmById = (id) => {
  return films.find((f) => f.id === id)
}

const removeFilmFromDb = (film) => {
  films.splice(films.indexOf(film), 1)
}

const replaceFilmInDb = (film, updatedFilm) => {
  films.splice(films.indexOf(film), 1, updatedFilm)
}

const verifyFilmReqBody = (req, updatedFilm, film) => {
  if (!req.body.title && req.body.director) {
    return (updatedFilm = { id: film.id, title: film.title, ...req.body })
  }

  if (req.body.title && !req.body.director) {
    return (updatedFilm = {
      id: film.id,
      ...req.body,
      director: film.director,
    })
  }
}

const verifyMssingFields = (req) => {
  if (!req.body.title && !req.body.director) {
    throw new MissingDataError("Missing fields in request body")
  }
}

module.exports = {
  verifyFilmReqQuery,
  verifyFilmBody,
  verifyFilmTitle,
  addFilmToDb,
  findFilmById,
  removeFilmFromDb,
  replaceFilmInDb,
  verifyFilmReqBody,
  verifyMssingFields,
}
