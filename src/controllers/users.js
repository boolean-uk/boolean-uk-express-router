let { users } = require('../../data/index')

let nextUserId = 4

const getAllUsers = (req, res) => {
    res.status(200).send({ users: users })
}

const addUser = (req, res) => {
    const newUser = { id: nextUserId, ...req.body }
    nextUserId++
    users.push(newUser)

    res.status(201).send({ user: newUser })
}

const getUserById = (req, res) => {
    const searchedUser = users.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedUser) {
        res.sendStatus(404)
    }

    res.status(200).send({ user: searchedUser })
}

const deleteUserById = (req, res) => {
    const searchedUser = users.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedUser) {
        res.sendStatus(404)
    }

    users = users.filter((element) => {
        return !(element.id === Number(req.params['id']))
    })

    res.status(200).send({ user: searchedUser })
}

const updateUserById = (req, res) => {
    const searchedUser = users.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedUser) {
        res.sendStatus(404)
    }

    Object.keys(req.body).forEach((element) => {
        if (searchedUser[element]) {
            searchedUser[element] = req.body[element]
        }
    })

    res.status(200).send({ user: searchedUser })
}

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    deleteUserById,
    updateUserById,
}
