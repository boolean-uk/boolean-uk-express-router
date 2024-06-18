const data = require("../../data/index.js");
const users = data.users;
let idCounter = 4
const { MissingFieldsError, DataAlreadyExistsError, DataNotFoundError } = require("../errors/errors.js")

function getAllUsers(req, res) {
  res.status(200).json({ users });
}

function createUser(req, res) {
    const newUser = req.body
    if (!newUser.email) {
        throw new MissingFieldsError('Missing fields in request body')
    }
    if (users.find((user) => user.email === newUser.email)) {
        throw new DataAlreadyExistsError('A user with the provided email already exists')
    }

    newUser.id = idCounter
    users.push(newUser)
    idCounter++
    res.status(201).json({ user: newUser})
}

function getUserById(req, res) {
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    if (!user) {
        throw new DataNotFoundError('A user with the provided ID does not exist')
    }
    res.status(200).json({ user })
}

function deleteUser(req, res) {
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    if (!user) {
        throw new DataNotFoundError('A user with the provided ID does not exist')
    }
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.status(200).json({ user })
}

function updateUser(req, res){
    const updatedParameters = req.body
    if (!updatedParameters.email) {
        throw new MissingFieldsError('Missing fields in request body')
    }
    if (users.find((user) => user.email === updatedParameters.email)) {
        throw new DataAlreadyExistsError('A user with the provided email already exists')
    }
    const userId = Number(req.params.id)
    const user = users.find((user) => user.id === userId)
    if (!user) {
        throw new DataNotFoundError('A user with the provided ID does not exist')
    }
    Object.assign(user, updatedParameters)

    res.status(200).json({ user })
}

module.exports = { getAllUsers, createUser, getUserById, deleteUser, updateUser };
