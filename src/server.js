const express = require('express')
const app = express()

const cors = require('cors')
const morgan = require('morgan')
const {
    MissingFieldsError,
    NotFoundError,
    AlreadyExistsError,
} = require('./errors/errors')

// SETUP MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



// REQUIRE ROUTERS
const usersRouter = require('./routers/users')
const booksRouter = require('./routers/books')
const filmsRouter = require('./routers/films')

// ADD ROUTERS TO APP
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/films', filmsRouter)
app.use((error, req, res, next) => {
    if (error instanceof MissingFieldsError) {
        return res.status(400).send({error:error.message})
    }
    if (error instanceof NotFoundError) {
        return res.status(404).send({error:error.message})
    }
    if (error instanceof AlreadyExistsError) {
        return res.status(409).send({error:error.message})
    }
})

module.exports = app
