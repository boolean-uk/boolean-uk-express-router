const router = require("express").Router();

let users = require("../../data/index.js").users;
let newUserId = 3;

router.get("/", (req, res) => {
  res.status(200).json({ users });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  if(!newUser.email) {
    return res.status(400).json({ error: "Missing fields in request body" }); 
  }

  const matchedUser = users.find((user) => user.email === newUser.email);

  if(matchedUser) {
    res.status(409).json({ error: "A user with the provided email already exists" }); 
  } else {
    newUserId += 1;
    newUser.id = newUserId;
    users.push(newUser);
    res.status(201).json({ user : newUser });
  }
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    res.status(404).json({ error: "A user with the provided ID does not exist" });
  };
  
  res.status(200).json({ user: foundUser });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundUser = users.find((user) => user.id === id);

  if(!foundUser) {
    res.status(404).json({ error: "A user with the provided ID does not exist" });
  }

  users = users.filter((user) => user.id !== foundUser.id);
  res.status(200).json({ user: foundUser });
  
});

router.put("/:id", (req, res) => {
  const updatedUser = req.body;
  const id = Number(req.params.id);
  updatedUser.id = id;

   if (!updatedUser.email) {
     return res.status(400).json({ error: "Missing fields in request body" });
   }

   const matchedUser = users.find((user) => user.email === updatedUser.email);

  if(matchedUser) {
    res.status(409).json({ error: "A user with the provided email already exists" }); 
  }

  const matchedUserID = users.find((user) => user.id === updatedUser.id);

   if(!matchedUserID) {
    res.status(404).json({ error: "A user with the provided ID does not exist" });
  } 

  const existingUserIndex = users.findIndex((user) => user.id === id);

  users.splice(existingUserIndex, 1, updatedUser);

  res.status(200).json({ user: updatedUser });
});

module.exports = router;
