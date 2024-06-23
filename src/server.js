const express = require("express")
const app = express()
const router = express.Router()
const {films: films} = require('../data/index')

const cors = require("cors")
const morgan = require("morgan")

// SETUP MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// REQUIRE ROUTERS
// const usersRouter = require("./routers/users")
// const booksRouter = require('./routers/books')
// const filmsRouter = require('./routers/films')

// ADD ROUTERS TO APP
app.get('/films', (req, res) => { 
    res.status(200).json({
        films: films
    })

})

module.exports = app
