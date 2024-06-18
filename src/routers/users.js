const express = require('express')
const usersRouter = express.Router()
const { getAllUsers, createUser, getUserById, deleteUser, updateUser } = require("../controllers/usersControllers.js")


usersRouter.get("/", getAllUsers)
usersRouter.post("/", createUser)
usersRouter.get("/:id", getUserById)
usersRouter.delete("/:id", deleteUser)
usersRouter.put("/:id", updateUser)

module.exports = usersRouter