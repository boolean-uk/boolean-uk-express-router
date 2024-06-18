const {
	getAllUsr,
	createNewUsr,
	getUsrById,
	deleteUsrById,
	updateUsrById,
} = require("../domain/usersRep.js")

const getAllUsers = (req, res) => {
	const users = getAllUsr()

	res.status(200).json({ users })
}

const createNewUser = (req, res) => {
	const newUser = createNewUsr(req.body)
	res.status(201).json({ newUser })
}

const getUserById = (req, res) => {
	const foundUser = getUsrById(Number(req.params.id))
	res.status(200).json({ foundUser })
}

const deleteUserById = (req, res) => {
    const user = deleteUsrById(Number(req.params.id))
    res.status(200).json({user})
}

const updateUserById = (req, res) => {
    const usrId = Number(req.params.id)
    const data = req.body

    const updateUser = updateUsrById(usrId,data)
    res.status(200).json({updateUser})
}

module.exports = { getAllUsers, createNewUser, getUserById, deleteUserById, updateUserById }
