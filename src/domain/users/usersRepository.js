const { users } = require("../../../data/index.js")
const MissingDataError = require("../../errors/MissingDataError.js")
const ExistingDataError = require("../../errors/ExistingDataError.js")

const verifyUserBody = (req) => {
  if (!req.body.email) {
    throw new MissingDataError("Missing fields in request body")
  }
}

const verifyUserEmail = (req) => {
  const existingUser = users.find((u) => u.email === req.body.email)

  if (existingUser) {
    throw new ExistingDataError(
      "A user with the provided email already exists"
    )
  }
}

const addUserToDb = (user) => {
  users.push(user)
}

const findUserId = (id) => {
  return users.find((u) => u.id === id)
}

const deleteUserFromDb = (user) => {
  users.splice(users.indexOf(user), 1)
}

const replaceUserInDb = (user, updatedUser) => {
  users.splice(users.indexOf(user), 1, updatedUser)
}

module.exports = {
  verifyUserBody,
  verifyUserEmail,
  addUserToDb,
  findUserId,
  deleteUserFromDb,
  replaceUserInDb,
}
