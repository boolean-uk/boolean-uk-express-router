const express = require("express")
const { films } = require("../../data")
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        films: films
    })
})

router.post('/', (req, res) => {
    const film = { id: films.length + 1, ...req.body}

    films.push(film)

    res.status(201).json({
        film: film
    })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const film = films.find(f => f.id === id)

    res.json({
        film: film
    })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const film = films.find(f => f.id === id)

    films.splice(films.indexOf(film), 1)

    res.json({
        film: film
    })
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const film = films.find(f => f.id === id)
    const updatedFilm = { id: film.id, ...req.body }

    films.splice(films.indexOf(film), 1, updatedFilm)

    res.json({
        film: updatedFilm
    })
})

module.exports = router
