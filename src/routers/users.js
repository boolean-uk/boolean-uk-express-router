const express = require('express')
const router = express.Router()
const { getAll, createUser, getUserById, deleteUser } = require('../controller/usersContorller.js')

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', getUserById)

router.delete('/:id', deleteUser)

module.exports = router