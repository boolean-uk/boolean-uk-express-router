const { films } = require('../../data/index.js')
console.log(films)

const getAll = (req, res) => {
  res.status(200).json({ films })
}

const createFilm = (req, res) => {

}

module.exports = { getAll }