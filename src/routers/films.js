// Import data here...
const express = require("express");
const { films } = require("../../data/index");
// Write routes here...

const router = express.Router();

router.get("/", (_req, res) => {
	res.status(200).json({ films });
});

router.post("/", (req, res) => {
	const film = { ...req.body, id: films[films.length - 1].id + 1 };
	films.push(film);

	return res.status(201).json({ film });
});

router.get("/:id", (req, res) =>
	res.status(200).json({ film: films.find((e) => e.id == req.params.id) })
);

router.delete("/:id", (req, res) =>
	res.status(200).json({
		film: films.splice(
			films.findIndex((e) => e.id == req.params.id),
			1
		)[0],
	})
);
router.put("/:id", (req, res) => {
	const film = { ...films.find((e) => e.id == req.params.id), ...req.body };
	films.splice(
		films.findIndex((e) => e.id == req.params.id),
		1,
		film
	);

	res.status(200).json({ film });
});

module.exports = router;
