const { Router } = require("express");
const getAll = require("../controllers/users/users");

const router = Router()

router.get('/', getAll)

module.exports = router