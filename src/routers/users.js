const express = require("express")
const { users } = require("../../data")
const MissingDataError = require("../errors/MissingDataError")
const ExistingDataError = require("../errors/ExistingDataError")
const DataNotFound = require("../errors/DataNotFound")
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        users: users
    })
})

router.post('/', (req, res) => {
    if (!req.body.email) {
        throw new MissingDataError('Missing fields in request body')
    }

    const existingUser = users.find(u => u.email === req.body.email)

    if (existingUser) {
        throw new ExistingDataError('A user with the provided email already exists')
    }

    const user = { id: users.length + 1, ...req.body}
    
    users.push(user)

    res.status(201).json({
        user: user
    })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        throw new DataNotFound('A user with the provided ID does not exist')
    }
    
    res.json({
        user: user
    })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        throw new DataNotFound('A user with the provided ID does not exist')
    }

    users.splice(users.indexOf(user), 1)

    res.json({
        user: user
    })
})

router.put('/:id', (req, res) => {
    if (!req.body.email) {
        throw new MissingDataError('Missing fields in request body')
    }

    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        throw new DataNotFound('A user with the provided ID does not exist')
    }

    const existingUser = users.find(u => u.email === req.body.email)

    if (existingUser) {
        throw new ExistingDataError('A user with the provided email already exists')
    }

    const updatedUser = { id: user.id, ...req.body }
    
    users.splice(users.indexOf(user), 1, updatedUser)

    res.json({
        user: updatedUser
    })
})

module.exports = router
