const express = require("express");
const router = express.Router();

const users = [
  { id: 1, email: "edward@mail.com" },
  { id: 2, email: "nathan@mail.com" },
  { id: 3, email: "mike@mail.com" },
];

// Endpoint to get all users
router.get("/", (req, res) => {
  res.json({ users });
});

// Endpoint to get a user by ID
router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
  res.json({ user });
});

// Endpoint to create a new user
router.post("/", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  }
  const newUser = {
    id: users.length + 1,
    email,
  };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

// Endpoint to update a user by ID
router.put("/:id", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
  const existingUser = users.find((u) => u.email === email && u.id !== user.id);
  if (existingUser) {
    return res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  }
  Object.assign(user, req.body);
  res.status(200).json({ user });
});

// Endpoint to partially update a user by ID
router.patch("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
  if (req.body.email) {
    const existingUser = users.find(
      (u) => u.email === req.body.email && u.id !== user.id
    );
    if (existingUser) {
      return res
        .status(409)
        .send({ error: "A user with the provided email already exists" });
    }
  }
  Object.assign(user, req.body);
  res.status(200).json({ user });
});

// Endpoint to delete a user by ID
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.status(200).json({ user: deletedUser[0] });
});

module.exports = router;
