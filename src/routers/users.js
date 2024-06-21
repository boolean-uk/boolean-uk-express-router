const { Router } = require("express");
const {getAll, createUser, getByID, removeUser, updateUser} = require("../controllers/users/users.js");

const router = Router()

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', getByID)

router.delete('/:id', removeUser)

router.put('/:id', updateUser)

module.exports = router