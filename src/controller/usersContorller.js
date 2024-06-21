const {users} = require('../../data/index.js')

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
  const found = users.find(u => u.id === id)
  console.log(found)
  if(found === undefined){
    return res.status(404).json({message : 'Didnt find the user!'})
  }
  res.status(200).json({user:found})
}

const deleteUser = (req, res)  => {
  const id = Number(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)
  if(userIndex === -1){
    return res.status(404).json({message : 'Didnt find the user!'})
  }
  const deletedUser = users.splice(userIndex, 1)
  res.status(200).json({user : deletedUser[0]})
}

const updateUser = (req, res) => {
  const id = Number(req.params.id)
  const { email } = req.body
  const userIndex = users.findIndex(u => u.id === id)
  if(userIndex === -1){
    return res.status(404).json({message : 'Didnt find the user!'})
  }
  users[userIndex].email = email
  res.status(200).json({user : users[userIndex]})
}


module.exports = { getAll, createUser, getUserById, deleteUser, updateUser }