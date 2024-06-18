const { Router } = require("express");
const {getAll, createUser, getByID} = require("../controllers/users/users");

const router = Router()

router.get('/', getAll)

router.post('/', createUser)

router.get('/:id', getByID)

module.exports = router