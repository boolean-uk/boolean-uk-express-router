const { users: users } = require('../../data/index')
const { user1, user2 } = require('../../test/fixtures/userData.js')

const getAllUsers = (req, res) => {
    res.status(200).json({
        users: users
    })
}

let id = users.length + 1
const postUsers = (req,res) => {
    const user = user1
    user.id = id
    users.push(user)
    id++
    res.status(201).json({ user })
}

const getUsersById = (req, res) => {
    const id = Number(req.params.id)

    const foundUser = users.find(i => i.id === 1)

    if ( id != 1 && !foundUser) {
        return res.status(404).json({
        })
    }
    foundUser.sort
    res.status(200).json({
        user: foundUser
    })
}

const deleteUserById = (req, res) => {
    const id = Number(req.params.id)
  
    const userFound = users.find((c) => c.id === id)
    const userIndex = users.indexOf(userFound)
    users.splice(userIndex, 1)
    return res.status(200).json({ user: userFound })
}

const updateUserById = (req, res) => {
	const userId = Number(req.params.id)
	const updatedUser = req.body
	updatedUser.id = userId
	users.splice(userId - 1, 1, updatedUser)
	res.status(200).json({ 'user': updatedUser })
}


module.exports = { getAllUsers, postUsers, getUsersById, deleteUserById, updateUserById }