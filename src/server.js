const express = require("express")
const app = express()

const cors = require("cors")
const morgan = require("morgan")

// SETUP MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// REQUIRE ROUTERS
const usersRouter = require("./routers/users")
const filmsRouter = require("./routers/films")
const booksRouter = require("./routers/books")

// ADD ROUTERS TO APP
app.use("/users", usersRouter)
app.use("/films", filmsRouter)
app.use("/books", booksRouter)

// ADD ERRORS CLASSES
const MissingDataError = require("./errors/MissingDataError")
const ExistingDataError = require("./errors/ExistingDataError")
const DataNotFound = require("./errors/DataNotFound")

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

  if (error instanceof DataNotFound) {
    return res.status(404).json({
      error: error.message,
    })
  }
})

module.exports = app
