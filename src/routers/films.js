const router = require('express').Router()
const data = require('../../data')
const { films } = data

let nextId = 5

router.get('/', (req, res) => {
    res.json({ films: films })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const queriedFilm = films.find((film) => film.id === id)

    res.json({
        film: queriedFilm,
    })
})

router.post('/', (req, res) => {
    const film = {
        ...req.body,
        id: nextId,
    }

    films.push(film)
    nextId++

    res.status(201).json({ film })
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updatedFilm = req.body
    console.log(updatedFilm)

    const filmIndex = films.findIndex((film) => film.id === id)

    films[filmIndex] = {
        ...films[filmIndex],
        ...updatedFilm,
    }

    res.json({ film: films[filmIndex] })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const filmIndex = films.findIndex((film) => film.id === id)
    const [deletedFilm] = films.splice(filmIndex, 1)

    res.status(200).json({ film: deletedFilm })
})

module.exports = router
