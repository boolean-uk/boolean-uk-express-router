const {getAllUsers, getUserById} = require('../../domain/users/users.js')
const newID = require('../../functions/createID.js')
const data = require('../../../data/index.js')

let newUser = {
    id: 0,
    email: 'string'
}


const getAll = (req, res) => {

    res.status(200).json({
        users: getAllUsers
    })
}

const createUser = (req, res) => {
    newUser.id = newID(data.users)
    newUser.email = req.body.email

    data.users.push(newUser)
    res.status(201).json({
        user: newUser
    })
}

const getByID = (req, res) => {
    const id = Number(req.params.id)
    const found = getUserById(id)

    res.status(200).json({
        user: found
    })
}

module.exports = {
    getAll,
    createUser,
    getByID
}
