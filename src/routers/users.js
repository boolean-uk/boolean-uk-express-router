const express = require('express')
const router = express.Router()
const { users } = require('../../data')


router.get('/', (request, respond) => {
    respond.status(200).json({ users })
})

router.get('/:id', (request, respond) => {
    const user = users.find(u => u.id === parseInt (request.params.id))
    if (user) {
        respond.status(200).json({ user })
    } else {
        respond.status(400).json({ error: 'user not found' })
    }
})

router.post('/', (request, respond) => {
    const newUser = {id: users.length ++, ...request.body}
    users.push(newUser)
    respond.status(201).json({ user: newUser })
})

router.put('/:id', (request, respond) => {
    const userId = parseInt(request.params.id)
    const { email } = request.body
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex !== -1) {

        users[userIndex] = {id: userId, email}
        respond.status(200).json({ user: users[userIndex] })
    } else {
        respond.status(400).json({ error: 'User not found' })
    }
}) 

router.delete('/:id', (request, respond) => {
    const userIndex = users.findIndex(u => u.id === parseInt(request.params.id))
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0]
        respond.status(200).json({ user: deletedUser })
    } else {
        respond.status(400).json({ error: 'User not found' })
    }
})

module.exports = router