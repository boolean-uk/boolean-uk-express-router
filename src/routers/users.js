const express = require("express");
const router = express.Router();

const getUsers = require("../../data/index.js");
const userData = require("../../test/fixtures/userData.js");

const users = getUsers.users;

router.get("/", (req, res) => {
  res.json({
    users,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((book) => book.id === id);

  res.json({
    user,
  });
});

router.post("/", (req, res) => {
  const user = userData.user1;
  user.id = 4;
  res.status(201).json({
    user,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  user.id = id;
  user.email = userData.user2.email;

  res.json({
    user,
  });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  res.json({ user: deletedUser });
});

module.exports = router;
