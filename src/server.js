const express = require("express")
const app = express()

const cors = require("cors")
const morgan = require("morgan")

// SETUP MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// REQUIRE ROUTERS
const usersRouter = require("./routers/users/users.js")
const filmsRouter = require("./routers/films/films.js")
const booksRouter = require("./routers/books/books.js")

// ADD ROUTERS TO APP
app.use("/users", usersRouter)
app.use("/films", filmsRouter)
app.use("/books", booksRouter)

// ADD ERRORS CLASSES
const MissingDataError = require("./errors/MissingDataError.js")
const ExistingDataError = require("./errors/ExistingDataError.js")
const DataNotFoundError = require("./errors/DataNotFoundError.js")

app.use((error, req, res, next) => {
  if (error instanceof MissingDataError) {
    return res.status(400).json({
      error: error.message,
    })
  }

  if (error instanceof ExistingDataError) {
    return res.status(409).json({
      error: error.message,
    })
  }

  if (error instanceof DataNotFoundError) {
    return res.status(404).json({
      error: error.message,
    })
  }
})

module.exports = app
