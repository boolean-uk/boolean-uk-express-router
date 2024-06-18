const { getAllUsers, newUser, getUserById, deleteUserById } = require("../../domain/users/usersRepository")

let idCounter = 4

const getAll = (req, res) => {
    const users = getAllUsers()

    res.json({users})
}

const createUser = (req, res) => {
    const user = req.body

    user.id = idCounter
    newUser(user)

    idCounter++

    res.status(201).json({user})
}

const findUser = (req, res) => {
    const userID = Number(req.params.id)
    const user = getUserById(userID)

    res.json({user})
}

const deleteUser = (req, res) => {
    const userID = Number(req.params.id)
    const user = getUserById(userID)

    deleteUserById(userID)

    res.json({user})
}

module.exports = {
    getAll,
    createUser,
    findUser,
    deleteUser
}