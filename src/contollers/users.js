const { users } = require("../../data/index.js");

let userID = users.length + 1;

const all = (req, res) => {
  res.status(200).json({ users: users });
};

const get = (req, res) => {
  const id = Number(req.params.id);
  const found = users.find((user) => user.id === id);
  if (!found) {
    res.status(404).send({ error: "A user with the provided ID does not exist" });
    throw new NotFoundError("A user with provided ID does not exist");
  }
  res.status(200).json({ user: found });
};

const create = (req, res) => {
  const newUser = req.body;
  if (!newUser.email) {
    res.status(400).send({ error: `Missing fields in request body` });
    throw new MissingFieldError(`Missing fields in request body`);
  }
  if (users.find((user) => user.email === newUser.email)) {
    res
      .status(409)
      .send({ error: `A user with the provided email already exists` });
    throw new MissingFieldError(`A user the with provided title already exists`);
  }
  newUser.id = userID;
  users.push(newUser);
  userID++;
  res.status(201).json({ user: newUser });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  const found = users.find((user) => user.id === id);
  if (!found) {
    res.status(404).send({ error: `A user with the provided ID does not exist` });
    throw new NotFoundError(`A user with the provided ID does not exist`);
  }

  if (!updates.email) {
    res.status(400).send({ error: `Missing fields in the request body` });
    throw new MissingFieldError(`Missing fields in the request body`);
  }

  if (users.find((user) => user.email === updates.email)) {
    res
      .status(409)
      .send({ error: `A user with the provided email already exists` });
    throw new MissingFieldError(`A user with the provided email already exists`);
  }
  const index = users.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ user: updated });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const found = users.find((user) => user.id === id);
  if (!found) {
    res.status(404).send({ error: `A user with the provided ID does not exist` });
    throw new NotFoundError(`A user with the provided ID does not exist`);
  }
  const index = users.indexOf(found);
  users.splice(index, 1);
  res.status(200).json({ user: found });
};

module.exports = {
  all,
  get,
  create,
  update,
  remove,
};
