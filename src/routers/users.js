const { Router } = require("express");
const {getAll, createUser} = require("../controllers/users/users");

const router = Router()

router.get('/', getAll)

router.post('/', createUser)

module.exports = router