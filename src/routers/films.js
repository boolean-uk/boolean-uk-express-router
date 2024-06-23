const express = require('express')
const router = express.Router()
const { films } = require('../../data')


router.get('/', (request, respond) => {
    respond.status(200).json({ films })
})

router.get('/:id', (request, respond) => {
    const film = films.find(f => f.id === parseInt (request.params.id))
    if (film) {
        respond.status(200).json({ film })
    } else {
        respond.status(404).json({ error: "film not found" })
    }
})

router.post('/', (request, respond) => {
    const newFilm = {id: films.length ++, ...request.body}
    films.push(newFilm)
    respond.status(201).json({film: newFilm} )
})

router.put('/:id', (request, respond) => {
    const filmId = parseInt(request.params.id) 
    const { title, director } = request.body
    const filmIndex = films.findIndex(f => f.id === filmId)

    if (filmIndex !== -1) {
        //
        films[filmIndex] = {id: filmId, title, director}
        respond.status(200).json({ film: films[filmIndex] })
    } else {
        respond.status(404).json ({error: 'Film not found' })
    }
})

router.delete('/:id', (request, respond) => {
    const filmIndex = films.findIndex(b => b.id === parseInt(request.params.id)) 
    if (filmIndex !== -1) {
        const deletedFilm = films.splice(filmIndex, 1)[0]
        respond.status(200).json({ film: deletedFilm })
    } else  {
        respond.status(404).json({ error: 'Film not found'})
    }
})
module.exports = router