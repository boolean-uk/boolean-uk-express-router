const data = require('../../../data/index.js')
const users = data.users

const getAllUsers = () => {
    return users
}

const getUserById = (id) => {
    return getAllUsers().find((u) => u.id === id)
}

module.exports = {
    getAllUsers,
    getUserById
}