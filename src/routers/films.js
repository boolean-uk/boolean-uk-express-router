const router = require("express").Router();
const data = require("../../data");

console.log(data.films)
// Write routes here...
let films = data.films
// Get all films
router.get('/', function (req, res) {
  res.status(200).json({
    films: films
  })
})

// Get a film by id
router.get('/:id', function (req, res) {
  const id = req.params.id;

  const film = films.find(function (film) {
    return film.id.toString() === id
  })

  res.status(200).json({
    film: film
  })
})

// Add a new film
router.post('/', function (req, res) {
  const film = req.body;

  // push new movie onto the array
  films.push(film);

  res.status(201).json({
    message: 'Added film succesffully'
  })
})

// delete film  by id
router.delete('/:id', function (req, res) {
  const id = req.params.id;

  films = films.filter(function (film) {
    return film.id.toString() !== id
  })

  res.status(200).json({
    message: `Deleted film ${id} successfully`
  })

})

// upadte film by id
router.put('/:id', function (req, res) {
    const id = req.params.id
    const updatedfilm = req.body;
  
    // get index of movie to update
    const existingfilmIndex = films.findIndex(function (film) {
      return film.id.toString() === id;
    })
  
    // update movie in array
    films[existingfilmIndex] = updatedfilm;
  
    res.status(200).json({
      message: `Updated movie ${films[existingfilmIndex].id} successfully`
    })
  
  })

module.exports = router;