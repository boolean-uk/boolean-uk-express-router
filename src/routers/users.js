const users = require("../../data/index.js").users
// console.log(users)

const express = require("express")
const router = express.Router()
let idCount = 4

router.get("/", (req, res) => {
    res.status(200).json({
        users
    })
})

router.post("/", (req, res) => {
    const user = req.body
    user.id = idCount
    users.push(user)
    idCount++
    res.status(201).json({
        user
    })
})

module.exports = router