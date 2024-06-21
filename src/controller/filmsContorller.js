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

module.exports = { getAll, createFilm  }