let { users } = require('../../data/index')
const {
    MissingFieldsError,
    NotFoundError,
    AlreadyExistsError,
} = require('../errors/errors')

let nextUserId = 4

const getAllUsers = (req, res) => {
    res.status(200).send({ users: users })
}

const addUser = (req, res) => {
    if (!req.body.email) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const alreadyExists = users.find((element) => {
        return element.email === req.body.email
    })

    if (alreadyExists) {
        throw new AlreadyExistsError(
            'A user with the provided email already exists'
        )
    }

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
        throw new NotFoundError('A user with the provided ID does not exist')
    }

    res.status(200).send({ user: searchedUser })
}

const deleteUserById = (req, res) => {
    const searchedUser = users.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedUser) {
        throw new NotFoundError('A user with the provided ID does not exist')
    }

    users = users.filter((element) => {
        return !(element.id === Number(req.params['id']))
    })

    res.status(200).send({ user: searchedUser })
}

const updateUserById = (req, res) => {
    if (!req.body.email) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const searchedUser = users.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedUser) {
        throw new NotFoundError('A user with the provided ID does not exist')
    }

    const alreadyExists = users.find((element) => {
        return element.email === req.body.email
    })

    if (alreadyExists) {
        throw new AlreadyExistsError(
            'A user with the provided email already exists'
        )
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
