const Joi = require("Joi");
const { users } = require("../../data/index");

const findUser = (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const user = users.find((user) => user.id === id);
  return { user, id };
};

const validateUser = (req, res) => {
  const schema = {
    email: Joi.string().required(),
  };

  return Joi.validate(req.body, schema);
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({ users });
};

exports.createUser = (req, res) => {
  const isExisted = users.find((user) => user.email === req.body.email);
  if (isExisted)
    return res.status(409).send("A user with provided email already exists");

  const { error } = validateUser(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  const id = users[users.length - 1].id + 1;
  const newUser = { id, ...req.body };

  users.push(newUser);
  res.status(201).json({ user: newUser });
};

exports.getUser = (req, res) => {
  const { user, id } = findUser(req, res);

  if (!user)
    return res.status(404).send(`The user with ID ${id} is not found.`);

  res.status(200).json({ user });
};

exports.deleteUser = (req, res) => {
  const { user, id } = findUser(req, res);
  if (!user)
    return res.status(404).send(`The user with ID ${id} is not found.`);

  users.splice(users.indexOf(user), 1);
  res.status(200).json({ user });
};

exports.updateUser = (req, res) => {
  const { user, id } = findUser(req, res);
  if (!user)
    return res.status(404).send(`The user with ID ${id} is not found.`);

  const isExisted = users.find((user) => user.email === req.body.email);
  if (isExisted)
    return res.status(409).send("A user with provided email already exists");

  const { error } = validateUser(req, res);
  if (error) return res.status(400).send(error.details[0].message);

  user.email = req.body.email;
  res.status(200).json({ user });
};
