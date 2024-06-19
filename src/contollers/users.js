const { users } = require("../../data/index.js");

let userID = users.length + 1;

const all = (req, res) => {
  res.status(200).json({ users: users });
};

const get = (req, res) => {
  const id = Number(req.params.id);
  const found = users.find((user) => user.id === id);
  res.status(200).json({ user: found });
};

const create = (req, res) => {
  const newuser = req.body;
  newuser.id = userID;
  users.push(newuser);
  userID++;
  res.status(201).json({ user: newuser });
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const updates = req.body;
  const found = users.find((user) => user.id === id);
  const index = users.indexOf(found);
  const updated = { ...found, ...updates };
  res.status(200).json({ user: updated });
};

const remove = (req, res) => {
  const id = Number(req.params.id);
  const found = users.find((user) => user.id === id);
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
