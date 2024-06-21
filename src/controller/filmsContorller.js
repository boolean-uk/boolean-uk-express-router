const { films } = require('../../data/index.js')

const getAll = (req, res) => {
  res.status(200).json({ films })
}

const createFilm = (req, res) => {
  const {title, director} = req.body
  const id = films[films.length-1].id + 1
  
  const newFilm = {id, title, director}
  films.push(newFilm)
  res.status(201).json({film : newFilm})
}

const GetFilmById = (req, res) => {
  const id = Number(req.params.id)
  const found = films.find(f => f.id === id)

  if(found === undefined) {
    return res.status(404).json({mesasage : "Didnt find the Film!"})
  }

  res.status(200).json({film : found})
}

module.exports = { getAll, createFilm, GetFilmById  }