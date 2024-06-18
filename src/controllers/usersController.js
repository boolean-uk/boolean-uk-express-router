const usersData = require("../../data/index.js")
const users = usersData.users

let newUserId = users.length + 1

const getAllUsers = (req, res) => {
	res.status(200).json({ users: users })
}

const createNewUser = (req, res) => {
	const newUser = req.body
	newUser.id = newUserId
	newUserId += 1
	users.push(newUser)
	res.status(201).json({ user: newUser })
}

const getUserById = (req, res) => {
    const userId = Number(req.params.id)
	const foundUser = users.find(u=>u.id === userId)
	res.status(200).json({user: foundUser })
}

const deleteUserById = (req, res) => {
    const userId = Number(req.params.id)
    const userToDelete = users.find((u) => u.id === userId)
    const indexToDelete = users.indexOf(userToDelete)
    users.splice(indexToDelete,1)
	res.status(200).json({ user: userToDelete })
}

const updateUserById = (req, res) => {
	const userId = Number(req.params.id)
	const updateUser = req.body
    updateUser.id = userId
    users.splice(userId - 1, 1, updateUser)
	res.status(200).json({ user: updateUser })
}

module.exports = {
	getAllUsers,
	createNewUser,
	getUserById,
	deleteUserById,
	updateUserById,
}
