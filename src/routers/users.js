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

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(user => user.id === id)
    res.status(200).json({
        user
    })
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    let index
    users.forEach((user, i) => {
        if (user.id === id) {
            index = i
        }
    })
    const removed = users.splice(index, 1)
    res.status(200).json({
        user: removed[0]
    })
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    let index
    users.forEach((user, i) => {
        if (user.id === id) {
            index = i
        }
    })
    const user = req.body
    user.id = id
    users.splice(index, 1, user)
    res.status(200).json({
        user
    })
})

module.exports = router