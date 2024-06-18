// Import data here...
const express = require('express')
const router = express.Router()
const { getAllUsers, addUser, getUserById, deleteUserById, updateUserById } = require('../controllers/users')

// Write routes here...
router.get('/', getAllUsers)

router.post('/', addUser)

router.get('/:id', getUserById)

router.delete('/:id', deleteUserById)

router.put('/:id', updateUserById)

module.exports = router