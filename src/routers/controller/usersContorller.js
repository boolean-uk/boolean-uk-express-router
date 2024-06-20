const {users} = require('../../../data/index.js')
console.log(users)
const getAll = (req, res) => {
  res.status(200).json({users})
}

module.exports = { getAll }