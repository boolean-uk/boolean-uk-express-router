const express = require('express')
const router = express.Router()
const { getAll, createUser, getUserById } = require('../controller/usersContorller.js')

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', getUserById)

module.exports = router