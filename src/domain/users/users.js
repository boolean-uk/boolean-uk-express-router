const data = require('../../../data/index.js')
const users = data.users

const getAllUsers = () => {
    return users
}

const getUserById = (id) => {
    return getAllUsers().find((u) => u.id === id)
}

const filterUserEmails = (email) => {
    return getAllUsers().find((u) => u.email === email)
}

module.exports = {
    getAllUsers,
    getUserById,
    filterUserEmails
}