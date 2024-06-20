const films = require("../../data/index.js").films
// console.log(films)

const express = require("express")
const router = express.Router()

let idCount = 5

router.get("/", (req, res) => {
    res.status(200).json({
        films
    })
})

router.post("/", (req, res) => {
    const film = req.body
    film.id = idCount
    films.push(film)
    idCount++
    res.status(201).json({
        film
    })
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const film = films.find(film => film.id === id)
    res.status(200).json({
        film
    })
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    let index
    films.forEach((film, i) => {
        if (film.id === id) {
            index = i
        }
    })
    const removed = films.splice(index, 1)
    res.status(200).json({
        film: removed[0]
    })
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    let index
    films.forEach((film, i) => {
        if (film.id === id) {
            index = i
        }
    })
    const film = req.body
    film.id = id
    films.splice(index, 1, film)
    res.status(200).json({
        film
    })
})

module.exports = router