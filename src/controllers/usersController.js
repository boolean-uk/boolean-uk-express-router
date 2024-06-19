const usersData = require("../../data/index.js")
const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("../errors/errors.js")

const users = usersData.users

let newUserId = users.length + 1

const getAllUsers = (req, res) => {
	res.status(200).json({ users: users })
}

const createNewUser = (req, res) => {
	const newUser = req.body

	if (!newUser.email) {
		throw new MissingFieldsError("Missing fields in request body")
	}
	if (users.find((u) => u.email === newUser.email)) {
		throw new ExistingDataError(
			"A user with the provided email already exists"
		)
	}

	newUser.id = newUserId
	newUserId += 1
	users.push(newUser)
	res.status(201).json({ user: newUser })
}

const getUserById = (req, res) => {
	const userId = Number(req.params.id)
	const foundUser = users.find((u) => u.id === userId)
	if (!foundUser) {
		throw new DataNotFoundError(
			"A user with the provided ID does not exist"
		)
	}
	res.status(200).json({ user: foundUser })
}

const deleteUserById = (req, res) => {
	const userId = Number(req.params.id)
	const userToDelete = users.find((u) => u.id === userId)
	if (!userToDelete) {
		throw new DataNotFoundError(
			"A user with the provided ID does not exist"
		)
	}
	const indexToDelete = users.indexOf(userToDelete)
	users.splice(indexToDelete, 1)
	res.status(200).json({ user: userToDelete })
}

const updateUserById = (req, res) => {
	const userId = Number(req.params.id)
	const updateUser = req.body

	const foundUser = users.find((u) => u.id === userId)
	if (!foundUser) {
		throw new DataNotFoundError(
			'A user with the provided ID does not exist'
		)
	}
	if (!updateUser.email) {
		throw new MissingFieldsError("Missing fields in request body")
	}
	if (users.find((u) => u.email === updateUser.email)) {
		throw new ExistingDataError(
			"A user with the provided email already exists"
		)
	}

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
