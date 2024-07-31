const router = require("express").Router();

let users = require("../../data/index.js").users;
let newUserId = 3;

router.get("/", (req, res) => {
  res.status(200).json({ users });
});

router.post("/", (req, res) => {
  const user = req.body;
  newUserId += 1;
  user.id = newUserId;

  users.push(user);
  res.status(201).json({ user });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundUser = users.find((user) => user.id === id);

  res.status(200).json({ user: foundUser });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundUser = users.find((user) => user.id === id);

  users = users.filter((user) => user.id !== foundUser.id);

  res.status(200).json({ user: foundUser });
});

router.put("/:id", (req, res) => {
  const updatedUser = req.body;
  const id = Number(req.params.id);

  const existingUserIndex = users.findIndex((user) => user.id === id);

  updatedUser.id = id;

  users.splice(existingUserIndex, 1, updatedUser);

  res.status(200).json({ user: updatedUser });
});

module.exports = router;
