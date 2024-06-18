const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./routers/users.js");
const filmsRouter = require("./routers/films.js")
const booksRouter = require("./routers/books.js")


// ADD ROUTERS TO APP
app.use("/users", usersRouter)
app.use("/films", filmsRouter)
app.use("/books", booksRouter)

// ADD ERRORS
const { MissingFieldsError, DataAlreadyExistsError, DataNotFoundError } = require("./errors/errors.js")

app.use((error, req, res, next) => {
    console.log(error)
    if (error instanceof MissingFieldsError) {
        return res.status(400).json({
            error: error.message
         })
    }

    if (error instanceof DataAlreadyExistsError) {
        return res.status(409).json({
            error: error.message
         })
    }

    if (error instanceof DataNotFoundError) {
        return res.status(404).json({
            error: error.message
        })
    }

    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = app
