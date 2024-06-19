const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const booksRouter = require("./routers/books");
const filmsRouter = require("./routers/films");
const usersRouter = require("./routers/users");

// ADD ROUTERS TO APP
app.use("/books", booksRouter);
app.use("/films", filmsRouter);
app.use("/users", usersRouter);

module.exports = app;
