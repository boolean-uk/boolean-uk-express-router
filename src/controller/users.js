const { users: users } = require('../../data/index')

const getAllUsers = (req, res) => {
    res.status(200).json({
        users: users
    })
}


module.exports = { getAllUsers }