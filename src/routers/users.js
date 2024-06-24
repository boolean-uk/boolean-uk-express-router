const Router = require('express')
const { getAllUsers, postUsers, getUsersById, deleteUserById, updateUserById } = require('../controller/users')

const router = Router()

router.get('/', getAllUsers)

router.post('/', postUsers)

router.get('/:id', getUsersById)

router.delete('/:id', deleteUserById)

router.put('/:id', updateUserById)

module.exports = router