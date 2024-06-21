const {users} = require('../../data/index.js')
// const { param } = require('../routers/users.js')

const getAll = (req, res) => {
  res.status(200).json({users})
}

const createUser = (req, res) => {
  const newUser = req.body
  const id = users[users.length-1].id + 1
  newUser.id = id
  users.push(newUser)
  res.status(201).json({user : newUser})
}

const getUserById = (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const userIndex = users.findIndex(u => u.id === id)
  if(userIndex === -1){
    return res.status(404).json({message : 'Didnt find the user!'})
  }
  const deletedUser = users.splice(userIndex, 1)
  res.status(200).json({user : deletedUser[0]})
}

module.exports = { getAll, createUser, getUserById }