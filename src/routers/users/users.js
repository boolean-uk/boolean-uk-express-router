const express = require("express")
const {
  getUsers,
  postUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../../controllers/users/usersControllers.js")
const router = express.Router()

router.get("/", getUsers)

router.post("/", postUser)

router.get("/:id", getUserById)

router.delete("/:id", deleteUser)

router.put("/:id", updateUser)

module.exports = router
