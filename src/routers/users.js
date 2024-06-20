const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteUser)
  .put(usersController.updateUser);

module.exports = router;
