const data = require("../../data/index.js");
const users = data.users;
let idCounter = 4

function getAllUsers(req, res) {
  res.status(200).json({ users });
}

function createUser(req, res) {
    const newUser = req.body
    newUser.id = idCounter
    users.push(newUser)
    idCounter++
    res.status(201).json({ user: newUser})
}

function getUserById(req, res) {
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    res.status(200).json({ user })
}

function deleteUser(req, res) {
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.status(200).json({ user })
}

function updateUser(req, res){
    const updatedParameters = req.body
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    Object.assign(user, updatedParameters)

    res.status(200).json({ user })
}

module.exports = { getAllUsers, createUser, getUserById, deleteUser, updateUser };
