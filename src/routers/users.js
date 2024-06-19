const express = require('express')
const usersRouter = express.Router()
const {getAllUsers,createNewUser,getUserById,deleteUserById,updateUserById} = require('../controllers/usersController.js')

usersRouter.get('/', getAllUsers)

usersRouter.post('/', createNewUser)

usersRouter.get('/:id', getUserById)

usersRouter.delete('/:id', deleteUserById)

usersRouter.put('/:id', updateUserById)


module.exports = usersRouter
