const express = require('express')
const router = express.Router()
const { getAll } = require('./controller/usersContorller.js')

router.get('/', getAll)



module.exports = router