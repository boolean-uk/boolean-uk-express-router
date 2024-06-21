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

const deleteById = (req, res) => {
  const id = Number(req.params.id)
  const filmIndex = films.findIndex(f => f.id === id)

  if(filmIndex === -1) {
    return res.status(404).json({message : 'The film dose not exist!'})
  }
  const deletedFilm = films.splice(filmIndex, 1)
  res.status(200).json({film : deletedFilm[0]})
}

const updateFilmById = (req, res) => {
  const id = Number(req.params.id)
  const {title, director} = req.body
  const filmIndex = films.findIndex(f => f.id === id)

  if(filmIndex === -1) {
    return res.status(404).json({message : 'The film dose not exist!'})
  }
  films[filmIndex] = {id, title, director}
  res.status(200).json({film : films[filmIndex]})
}

module.exports = { getAll, createFilm, GetFilmById, deleteById, updateFilmById  }