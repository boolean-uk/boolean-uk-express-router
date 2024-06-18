const data = require("../../data/index.js");
const films = data.films;
let idCounter = 5

function getAllFilms(req, res){
    res.status(200).json({ films })
}

function createFilm(req, res){
    const film = req.body
    film.id = idCounter
    films.push(film)
    idCounter++
    res.status(201).json({ film })
}

module.exports = { getAllFilms, createFilm }