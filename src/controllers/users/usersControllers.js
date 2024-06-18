const { users } = require("../../../data/index.js")
const {
  verifyUserBody,
  verifyUserEmail,
  addUserToDb,
  findUserId,
  deleteUserFromDb,
  replaceUserInDb,
} = require("../../domain/users/usersRepository.js")
const DataNotFoundError = require("../../errors/DataNotFoundError.js")

const getUsers = (req, res) => {
  res.json({
    users: users,
  })
}

const postUser = (req, res) => {
  verifyUserBody(req)

  verifyUserEmail(req)

  const user = { id: users.length + 1, ...req.body }

  addUserToDb(user)

  res.status(201).json({
    user: user,
  })
}

const getUserById = (req, res) => {
  const id = Number(req.params.id)
  const user = findUserId(id)

  if (!user) {
    throw new DataNotFoundError("A user with the provided ID does not exist")
  }

  res.json({
    user: user,
  })
}

const deleteUser = (req, res) => {
  const id = Number(req.params.id)
  const user = findUserId(id)

  if (!user) {
    throw new DataNotFoundError("A user with the provided ID does not exist")
  }

  deleteUserFromDb(user)

  res.json({
    user: user,
  })
}

const updateUser = (req, res) => {
  verifyUserBody(req)

  const id = Number(req.params.id)
  const user = findUserId(id)

  if (!user) {
    throw new DataNotFoundError("A user with the provided ID does not exist")
  }

  verifyUserEmail(req)

  const updatedUser = { id: user.id, ...req.body }

  replaceUserInDb(user, updatedUser)

  res.json({
    user: updatedUser,
  })
}

module.exports = {
  getUsers,
  postUser,
  getUserById,
  deleteUser,
  updateUser,
}
