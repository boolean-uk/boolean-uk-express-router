let { users } = require("../../../data/index")

function getAllUsers() {
    return users
}

function newUser(user) {
    users.push(user)
}

function getUserById(id) {
    return users.find((user) => user.id === id)
}

function deleteUserById(id) {
    users = users.filter((user) => user.id !== id)
}

module.exports = {
    getAllUsers,
    newUser,
    getUserById,
    deleteUserById
}