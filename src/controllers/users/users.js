const {getAllUsers, getUserById} = require('../../domain/users/users.js')
const newID = require('../../functions/createID.js')
const {deletedUsers} = require('../../../data/deletedUsers.js')

let newUser = {
    id: 0,
    email: 'string'
}


const getAll = (req, res) => {
    res.status(200).json({
        users: getAllUsers()
    })
}

const createUser = (req, res) => {
    newUser.id = newID(getAllUsers())
    newUser.email = req.body.email

    getAllUsers().push(newUser)
    res.status(201).json({
        user: newUser
    })
}

const getByID = (req, res) => {
    const id = Number(req.params.id)
    const found = getUserById(id)

    res.status(200).json({
        user: found
    })
}

const removeUser = (req, res) => {
    const id = Number(req.params.id)
    const found = getUserById(id)

    deletedUsers.push(found)
    const index = getAllUsers().indexOf(found)
    getAllUsers().splice(index, 1)
    res.status(200).json({
        user: found
    })
}

const updateUser = (req, res) => {
    const id = Number(req.params.id)
    const found = getUserById(id)

    found.email = req.body.email
    res.status(200).json({
        user: found
    })
}

module.exports = {
    getAll,
    createUser,
    getByID,
    removeUser,
    updateUser
}
