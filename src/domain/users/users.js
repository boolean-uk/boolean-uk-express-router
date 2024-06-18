const data = require('../../../data/index.js')
const users = data.users

const getAllUsers = () => {
    return users
}

module.exports = getAllUsers()