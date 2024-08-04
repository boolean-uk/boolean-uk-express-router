const router = require('express').Router()
const data = require('../../data/index')
const { users } = data

let nextId = 4

router.get('/', (req, res) => {
    res.json({
        users: users,
    })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const queriedUser = users.find((user) => user.id === id)

    res.json({
        user: queriedUser,
    })
})

router.post('/', (req, res) => {
    const user = {
        ...req.body,
        id: nextId,
    }

    users.push(user)
    nextId++

    res.status(201).json({ user })
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updatedUser = req.body
    console.log(updatedUser)

    const userIndex = users.findIndex((user) => user.id === id)

    users[userIndex] = {
        ...users[userIndex],
        ...updatedUser,
    }

    res.json({ user: users[userIndex] })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const userIndex = users.findIndex((user) => user.id === id)
    const [deletedUser] = users.splice(userIndex, 1)

    res.status(200).json({ user: deletedUser })
})

module.exports = router
