const router = require("express").Router();
const data = require("../../data");

console.log(data)
// Write routes here...
let users = data.users
// Get all users
router.get('/', function (req, res) {
  res.status(200).json({
    users: users
  })
})


// Get a user by id
router.get('/:id', function (req, res) {
  const id = req.params.id;

  const user = users.find(function (u) {
    return u.id.toString() === id
  })

  res.status(200).json({
    user: user
  })
})

// Add a new user
router.post('/', function (req, res) {
  const user = req.body;

  users.push(user);

  res.status(201).json({
    message: 'Added user succesffully'
  })
})

// delete user  by id
router.delete('/:id', function (req, res) {
  const id = req.params.id;

  users = users.filter(function (user) {
    return user.id.toString() !== id
  })

  res.status(200).json({
    message: `Deleted user ${id} successfully`
  })

})

// upadte user by id
router.put('/:id', function (req, res) {
    const id = req.params.id
    const updatedUser = req.body;
  
    // get index of movie to update
    const existingUserIndex = users.findIndex(function (user) {
      return user.id.toString() === id;
    })
  
    // update movie in array
    users[existingUserIndex] = updatedUser;
  
    res.status(200).json({
      message: `Updated movie ${users[existingUserIndex].id} successfully`
    })
  
  })

module.exports = router;