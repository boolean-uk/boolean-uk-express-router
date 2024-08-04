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

function alreadyExistsErr(res) {
  return res.status(409).json({
    error: "A user with the provided email already exists",
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
  } else if (users.find((user) => user.email == req.body.email)) {
    alreadyExistsErr(res);
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

  if (!foundUser) {
    noUserErr(res);
  } else if (users.find((user) => user.email == req.body.email)) {
    alreadyExistsErr(res);
  } else {
    let theUser = (users[users.indexOf(foundUser)] = {
      id: foundUser.id,
      ...req.body,
    });
    res.json({
      user: theUser,
    });
  }
});

module.exports = router;
