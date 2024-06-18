let { users } = require("../../../data/index.js")
const NotFoundError = require("../../errors/notFoundError.js")

function getAllUsers() {
    return users
}

function newUser(user) {
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
    
    Object.assign(users, updatedUser)
}

module.exports = {
    getAllUsers,
    newUser,
    getUserById,
    deleteUserById,
    updateUserById
}