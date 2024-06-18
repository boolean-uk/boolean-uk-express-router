let { users } = require("../../../data/index.js")
const MissingFieldsError = require("../../errors/missingFieldsError.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllUsers() {
    return users
}

function newUser(user) {
    if (!verifyUserProperties(user)) {
        throw new MissingFieldsError('Missing fields in request body')
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

    Object.assign(users, updatedUser)
}

function verifyUserProperties(object) {
    const neededProperties = 'email'

    if (object[neededProperties] === undefined) {
        return false
    }

    return true
}

    

module.exports = {
    getAllUsers,
    newUser,
    getUserById,
    deleteUserById,
    updateUserById
}