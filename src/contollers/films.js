const { films } = require("../../data/index.js");

let filmID = films.length + 1;

const all = (req, res) => {
  res.status(200).json({ films: films });
};

const get = (req, res) => {
  const id = Number(req.params.id);
  const found = films.find((film) => film.id === id);
  res.status(200).json({ film: found });
};

const create = (req, res) => {
  const newfilm = req.body;
  newfilm.id = filmID;
  films.push(newfilm);
  filmID++;
  res.status(201).json({ film: newfilm });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  const found = films.find((film) => film.id === id);
  const index = films.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ film: updated });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const found = films.find((film) => film.id === id);
  const index = films.indexOf(found);
  films.splice(index, 1);
  res.status(200).json({ film: found });
};

module.exports = {
  all,
  get,
  create,
  update,
  remove,
};
