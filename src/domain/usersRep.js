const { users } = require("../../data/index.js")
// const usersDb = require(users)

let newUsrId = users.length + 1

const getAllUsr = () => {
	return users
}

const createNewUsr = (data) => {
	const newUser = data
	newUser.id = newUsrId
	newUsrId += 1
	users.push(newUser)
}

const getUsrById = (id) => {
	return users.find((u) => u.id === id)
}

const deleteUsrById = (id) => {
	const userToDelete = users.find((u) => u.id === id)
	users = users.filter((u) => u.id !== id)

	return userToDelete
}

const updateUsrById = (id, data) => {
	const userId = id
	const updatedUser = data
	updatedUser.id = userId
	users.splice(userId - 1, 1, updatedUser)
	return updatedUser
}

module.exports = {
	getAllUsr,
	createNewUsr,
	getUsrById,
	deleteUsrById,
	updateUsrById,
}
