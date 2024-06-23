// Import data here...

const express = require('express')
const router = express.Router()
const { books } = require('../../data')


// Write routes here...
router.get('/', (request, respond) => {
    respond.status(200).json({ books })
})



module.exports = router