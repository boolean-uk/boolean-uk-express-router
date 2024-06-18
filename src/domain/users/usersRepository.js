let { users } = require("../../../data/index.js")
const MissingFieldsError = require("../../errors/missingFieldsError.js")
const NotFoundError = require("../../errors/notFoundError.js")
const AlreadyExistsError = require("../../errors/alreadyExistsError.js")

function getAllUsers() {
    return users
}

function newUser(user) {
    if (!verifyUserProperties(user)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    if (verifyEmail(user)) {
        throw new AlreadyExistsError('A user with the provided email already exists')
    }

    users.push(user)
}

function getUserById(id) {
    const found = users.find((user) => user.id === id)

    if (!found) {
        throw new NotFoundError('A user with the provided ID does not exist')
    }

    return found
}

function deleteUserById(id) {
    const found = users.find((user) => user.id === id)

    if (!found) {
        throw new NotFoundError('A user with the provided ID does not exist')
    }

    users = users.filter((user) => user.id !== id)
}

function updateUserById(id, updatedUser) {
    const found = users.find((user) => user.id === id)

    if (!found) {
        throw new NotFoundError('A user with the provided ID does not exist')
    }

    if (!verifyUserProperties(updatedUser)) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    if (verifyEmail(updatedUser)) {
        throw new AlreadyExistsError('A user with the provided email already exists')
    }

    Object.assign(users, updatedUser)
}

function verifyUserProperties(object) {
    const neededProperties = 'email'

    if (object[neededProperties] === undefined) {
        return false
    }

    return true
}

function verifyEmail(object) {
    const foundEmail = users.find((user) => user.email === object.email)

    if (foundEmail) {
        return true
    }

    return false
}  

module.exports = {
    getAllUsers,
    newUser,
    getUserById,
    deleteUserById,
    updateUserById
}