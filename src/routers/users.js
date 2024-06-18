const express = require('express')
const { getAll, createUser, findUser, deleteUser } = require('../controllers/users/usersController')
const router = express.Router()

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', findUser)

router.delete('/:id', deleteUser)

module.exports = router