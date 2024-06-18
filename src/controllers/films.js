let { films } = require('../../data/index')
const {
    MissingFieldsError,
    NotFoundError,
    AlreadyExistsError,
} = require('../errors/errors')

let nextFilmId = 5

const getAllFilms = (req, res) => {
    let filmsToSend

    if(req.query.director) {
        filmsToSend = films.filter((element) => {
            return element.director === req.query.director
        })
    } else {
        filmsToSend = films
    }
    
    res.status(200).send({ films: filmsToSend })
}

const addFilm = (req, res) => {
    if (!req.body.title || !req.body.director) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const alreadyExists = films.find((element) => {
        return element.title === req.body.title
    })

    if (alreadyExists) {
        throw new AlreadyExistsError(
            'A film with the provided title already exists'
        )
    }

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
        throw new NotFoundError('A film with provided ID does not exist')
    }

    res.status(200).send({ film: searchedFilm })
}

const deleteFilmById = (req, res) => {
    const searchedFilm = films.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedFilm) {
        throw new NotFoundError('A film with provided ID does not exist')
    }

    films = films.filter((element) => {
        return !(element.id === Number(req.params['id']))
    })

    res.status(200).send({ film: searchedFilm })
}

const updateFilmById = (req, res) => {
    if (!req.body.title || !req.body.director) {
        throw new MissingFieldsError('Missing fields in request body')
    }

    const searchedFilm = films.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedFilm) {
        throw new NotFoundError('A film with provided ID does not exist')
    }

    const alreadyExists = films.find((element) => {
        return element.title === req.body.title
    })

    if (alreadyExists) {
        throw new AlreadyExistsError(
            'A film with the provided title already exists'
        )
    }

    Object.keys(req.body).forEach((element) => {
        if (searchedFilm[element]) {
            searchedFilm[element] = req.body[element]
        }
    })

    res.status(200).send({ film: searchedFilm })
}

const patchFilmById = (req, res) => {
    const searchedFilm = films.find((element) => {
        return element.id === Number(req.params['id'])
    })

    if (!searchedFilm) {
        throw new NotFoundError('A film with provided ID does not exist')
    }

    const alreadyExists = films.find((element) => {
        return element.title === req.body.title
    })

    if (alreadyExists) {
        throw new AlreadyExistsError(
            'A film with the provided title already exists'
        )
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
    patchFilmById,
}
