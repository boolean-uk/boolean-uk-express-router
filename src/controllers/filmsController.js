const Joi = require("Joi");
const { films } = require("../../data/index");

function findFilm(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const film = films.find((film) => film.id === id);

  return { film, id };
}

function validateFilm(req, res) {
  const schema = {
    title: Joi.string().required(),
    director: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
}

exports.getAllFilms = (req, res) => {
  res.status(200).json({ films });
};

exports.createFilm = (req, res) => {
  const isExisted = films.find((film) => film.title === req.body.title);
  if (isExisted)
    return res.status(409).send("A film with provided title already exists");

  const { error } = validateFilm(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const id = films[films.length - 1].id + 1;
  const newFilm = { id, ...req.body };

  films.push(newFilm);
  res.status(201).json({ film: newFilm });
};

exports.getFilm = (req, res) => {
  const { film, id } = findFilm(req, res);
  if (!film)
    return res.status(404).send(`The film with ID ${id} is not found.`);

  res.status(200).json({ film });
};

exports.deleteFilm = (req, res) => {
  const { film, id } = findFilm(req, res);
  if (!film)
    return res.status(404).send(`The film with ID ${id} is not found.`);

  films.splice(films.indexOf(film), 1);

  res.status(200).json({ film });
};

exports.updateFilm = (req, res) => {
  const { film, id } = findFilm(req, res);
  if (!film)
    return res.status(404).send(`The film with ID ${id} is not found.`);

  const isExisted = films.find((film) => film.title === req.body.title);
  if (isExisted)
    return res.status(409).send("A film with provided title already exists");

  const { error } = validateFilm(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  film.title = req.body.title;
  film.director = req.body.director;
  res.status(200).json({ film });
};
