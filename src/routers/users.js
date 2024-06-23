const Router = require('express')
const { getAllUsers } = require('../controller/users')

const router = Router()

router.get('/', getAllUsers)

module.exports = router