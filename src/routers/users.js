const express = require('express')
const { getAll, createUser, findUser, deleteUser, updateUser } = require('../controllers/users/usersController')
const router = express.Router()

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', findUser)

router.delete('/:id', deleteUser)

router.put('/:id', updateUser)

module.exports = router