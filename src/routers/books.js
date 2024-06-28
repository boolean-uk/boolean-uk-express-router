// Import data here...
const express = require("express");
const { books } = require("../../data/index");
// Write routes here...

const router = express.Router();

router.get("/", (_req, res) => {
	res.status(200).json({ books });
});

router.post("/", (req, res) => {
	const book = { ...req.body, id: books[books.length - 1].id + 1 };
	books.push(book);

	return res.status(201).json({ book });
});

router.get("/:id", (req, res) =>
	res.status(200).json({ book: books.find((e) => e.id == req.params.id) })
);

router.delete("/:id", (req, res) => {
	res.status(200).json({
		book: books.splice(
			books.findIndex((e) => e.id == req.params.id),
			1
		)[0],
	});
});
router.put("/:id", (req, res) => {
	const book = { ...books.find((e) => e.id == req.params.id), ...req.body };
	books.splice(
		books.findIndex((e) => e.id == req.params.id),
		1,
		book
	);

	res.status(200).json({ book });
});

module.exports = router;
