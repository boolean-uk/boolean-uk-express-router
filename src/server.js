const Joi = require("Joi");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const usersRouter = require("./routers/users");
const filmsRouter = require("./routers/films");
const booksRouter = require("./routers/books");

const app = express();

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/films", filmsRouter);
app.use("/books", booksRouter);

module.exports = app;
