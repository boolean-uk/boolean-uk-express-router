const express = require("express")
const { users } = require("../../data")
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        users: users
    })
})

router.post('/', (req, res) => {
    const user = { id: users.length + 1, ...req.body}
    
    users.push(user)

    res.status(201).json({
        user: user
    })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    
    res.json({
        user: user
    })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    users.splice(users.indexOf(user), 1)

    res.json({
        user: user
    })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)
    const updatedUser = { id: user.id, ...req.body }
    
    users.splice(users.indexOf(user), 1, updatedUser)

    res.json({
        user: updatedUser
    })
})

module.exports = router
