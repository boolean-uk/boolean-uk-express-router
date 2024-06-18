let { films } = require('../../data/index')

let nextFilmId = 5

const getAllFilms = (req, res) => {
    res.status(200).send({ films: films })
}

const addFilm = (req, res) => {
    const newFilm = { id: nextFilmId, ...req.body }
    nextFilmId++
    films.push(newFilm)

    res.status(201).send({ film: newFilm })
}

const getFilmById = (req, res) => {
    const searchedFilm = films.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedFilm) {
        res.sendStatus(404)
    }

    res.status(200).send({ film: searchedFilm })
}

const deleteFilmById = (req, res) => {
    const searchedFilm = films.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedFilm) {
        res.sendStatus(404)
    }

    films = films.filter((element) => {
        return !(element.id === Number(req.params['id']))
    })

    res.status(200).send({ film: searchedFilm })
}

const updateFilmById = (req, res) => {
    const searchedFilm = films.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedFilm) {
        res.sendStatus(404)
    }

    Object.keys(req.body).forEach((element) => {
        if (searchedFilm[element]) {
            searchedFilm[element] = req.body[element]
        }
    })

    res.status(200).send({ film: searchedFilm })
}

module.exports = {
    getAllFilms,
    addFilm,
    getFilmById,
    deleteFilmById,
    updateFilmById,
}
