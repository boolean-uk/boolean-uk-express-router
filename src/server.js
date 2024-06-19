const express = require("express")
const app = express()
// const{ MissingFieldsError} = require('./errors/errors.js')
const cors = require("cors")
const morgan = require("morgan")

// SETUP MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// REQUIRE ROUTERS
const usersRouter = require("./routers/users.js")
const filmsRouter = require("./routers/films.js")
const booksRouter = require("./routers/books.js")
const {
	MissingFieldsError,
	ExistingDataError,
	DataNotFoundError,
} = require("./errors/errors.js")

// ADD ROUTERS TO APP

app.use("/users", usersRouter)
app.use("/films", filmsRouter)
app.use("/books", booksRouter)

app.use((error, req, res, next) => {
	if (error instanceof MissingFieldsError) {
		return res.status(400).json({ error: error.message })
	}
	if (error instanceof DataNotFoundError) {
		return res.status(404).json({ error: error.message })
	}
	if (error instanceof ExistingDataError) {
		return res.status(409).json({ error: error.message })
	}

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = app
