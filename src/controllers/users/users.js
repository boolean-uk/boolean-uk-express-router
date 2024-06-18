const getAllUsers = require('../../domain/users/users.js')

const getAll = (req, res) => {

    res.status(200).json({
        getAllUsers
    })
}

module.exports = getAll