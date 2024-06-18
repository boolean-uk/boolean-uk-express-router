const { Router } = require("express");
const {getAll, createUser, getByID, removeUser} = require("../controllers/users/users.js");

const router = Router()

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', getByID)

router.delete('/:id', removeUser)

module.exports = router