const { films } = require("../../data/index.js");

let filmID = films.length + 1;

const all = (req, res) => {
  const { director } = req.query;
  if (!director) {
    res.status(200).json({ films: films });
  }
  const found = films.filter((film) => film.director === director);
  res.status(200).json({ films: found });
};

const get = (req, res) => {
  const id = Number(req.params.id);
  const found = films.find((film) => film.id === id);
  if (!found) {
    res.status(404).send({ error: "A film with provided ID does not exist" });
    throw new NotFoundError("A film with provided ID does not exist");
  }
  res.status(200).json({ film: found });
};

const create = (req, res) => {
  const newfilm = req.body;
  if (!newfilm.title || !newfilm.director) {
    res.status(400).send({ error: `Missing fields in request body` });
    throw new MissingFieldError(`Missing fields in request body`);
  }
  if (films.find((film) => film.title === newfilm.title)) {
    res
      .status(409)
      .send({ error: `A film with the provided title already exists` });
    throw new MissingFieldError(
      `A film with the provided title already exists`
    );
  }
  newfilm.id = filmID;
  films.push(newfilm);
  filmID++;
  res.status(201).json({ film: newfilm });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  const found = films.find((film) => film.id === id);
  if (!found) {
    res.status(404).send({ error: `A film with provided ID does not exist` });
    throw new NotFoundError(`A film with provided ID does not exist`);
  }

  if (!updates.title || !updates.director) {
    res.status(400).send({ error: `Missing fields in the request body` });
    throw new MissingFieldError(`Missing fields in the request body`);
  }

  if (films.find((film) => film.title === updates.title)) {
    res
      .status(409)
      .send({ error: `A film with the provided title already exists` });
    throw new MissingFieldError(`A film with the provided title already exists`);
  }
  const index = films.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ film: updated });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const found = films.find((film) => film.id === id);
  if (!found) {
    res.status(404).send({ error: `A film with provided ID does not exist` });
    throw new NotFoundError(`A film with provided ID does not exist`);
  }
  const index = films.indexOf(found);
  films.splice(index, 1);
  res.status(200).json({ film: found });
};

const patch = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;

  if (!updates.title && !updates.director) {
    res.status(400).send({ error: `Missing fields in the request body` });
    throw new MissingFieldError(`Missing fields in the request body`);
  }

  if (films.find((film) => film.title === updates.title)) {
    res
      .status(409)
      .send({ error: `A film with the provided title already exists` });
    throw new MissingFieldError(
      `A film with the provided title already exists`
    );
  }

  const found = films.find((film) => film.id === id);
  if (!found) {
    res.status(404).send({ error: `A film with provided ID does not exist` });
    throw new NotFoundError(`A film with provided ID does not exist`);
  }
  
  const index = films.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ film: updated });
};

module.exports = {
  all,
  get,
  create,
  update,
  remove,
  patch
};
