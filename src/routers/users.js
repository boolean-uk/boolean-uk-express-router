const express = require("express");
const router = express.Router();

let { users } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.status(200).json({ users: users });
});

router.post("/", function (req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400);
  }
  const currentHighId = users.reduce((max, obj) => {
    return obj.id > max ? obj.id : max;
  }, 0);
  req.body.id = currentHighId + 1;
  users.push(req.body);
  res.status(201).json({ user: req.body });
});

router.get("/:id", function (req, res) {
  const toFind = parseInt(req.params.id, 10);
  const index = users.findIndex((obj) => obj.id === toFind);
  const foundUser = users[index];
  if (foundUser) {
    res.status(200).json({ user: foundUser });
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", function (req, res) {
  const toRemove = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((obj) => obj.id === toRemove);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users[userIndex];
  users = users.filter((obj) => obj.id !== toRemove);

  res.status(200).json({ user: deletedUser });
});

router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { firstName, lastName, street, city, type, email, linkedin, twitter } =
    req.body;
  const updatedUser = {
    ...users[userIndex],
    email,
  };
  users[userIndex] = updatedUser;

  res.status(200).json({ user: updatedUser });
});

module.exports = router;
