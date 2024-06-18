const {getAllUsers, getUserById} = require('../../domain/users/users.js')
const newID = require('../../functions/createID.js')
const {deletedUsers} = require('../../../data/deletedData.js')

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

    if (typeof id !== "number") {
        throw new InvalidDataError("ID must be a number")
    }

    if (!found) {
        throw new NotFoundError("Book not found")
    }

    res.status(200).json({
        user: found
    })
}

const removeUser = (req, res) => {
    const id = Number(req.params.id)
    const found = getUserById(id)

    if (typeof id !== "number") {
        throw new InvalidDataError("ID must be a number")
    }

    if (!found) {
        throw new NotFoundError("Book not found")
    }

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

    if (filterUserEmails(req.body.email)) {
        throw new AlreadyExistsError("A user already exists with this email")
    }

    if (req.body.email === "") {
        throw new FieldsMissing("Email field missing")
    }

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
