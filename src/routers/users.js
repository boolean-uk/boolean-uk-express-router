const express = require("express");

const router = express.Router();

const { users } = require("../../data/index");

let nextUserId = users.length + 1;

//FUNCTIONS

function getUserById(providedId) {
  const foundUser = users.find((user) => user.id == providedId);
  return foundUser;
}

function noUserErr(res) {
  return res.status(404).json({
    error: "A user with the provided ID does not exist",
  });
}

function missingFieldsErr(res) {
  return res.status(400).json({
    error: "Missing fields in request body",
  });
}

//GET ROUTES

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const foundUser = getUserById(req.params.id);

  foundUser
    ? res.json({
        user: foundUser,
      })
    : noUserErr(res);
});

//POST ROUTES

router.post("/", (req, res) => {
  if (!req.body.email) {
    missingFieldsErr(res);
  } else {
    const newUser = { id: nextUserId, ...req.body };
    users.push(newUser);
    res.status(201).json({ user: newUser });
    nextUserId++;
  }
});

//DELETE ROUTES

router.delete("/:id", (req, res) => {
  const foundUser = getUserById(req.params.id);

  if (foundUser) {
    users.splice(users.indexOf(foundUser), 1);
    res.json({
      user: foundUser,
    });
  } else {
    noUserErr(res);
  }
});

//PUT ROUTES

router.put("/:id", (req, res) => {
  const foundUser = getUserById(req.params.id);

  if (foundUser) {
    let theUser = (users[users.indexOf(foundUser)] = {
      id: foundUser.id,
      ...req.body,
    });
    res.json({
      user: theUser,
    });
  } else {
    noUserErr(res);
  }
});

module.exports = router;
