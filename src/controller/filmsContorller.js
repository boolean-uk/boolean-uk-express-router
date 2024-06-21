const { films } = require('../../data/index.js')
console.log(films)

const getAll = (req, res) => {
  console.log('test')
  res.status(200).json({ films })
}

module.exports = { getAll }