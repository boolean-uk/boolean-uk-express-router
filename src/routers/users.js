// Import data here...
const express = require("express");
const { users } = require("../../data/index");
// Write routes here...

const router = express.Router();

router.get("/", (_req, res) => {
	res.status(200).json({ users });
});

router.post("/", (req, res) => {
	const user = { ...req.body, id: users[users.length - 1].id + 1 };
	users.push(user);

	return res.status(201).json({ user });
});

router.get("/:id", (req, res) =>
	res.status(200).json({ user: users.find((e) => e.id == req.params.id) })
);

router.delete("/:id", (req, res) =>
	res.status(200).json({
		user: users.splice(
			users.findIndex((e) => e.id == req.params.id),
			1
		)[0],
	})
);
router.put("/:id", (req, res) => {
	const user = { ...users.find((e) => e.id == req.params.id), ...req.body };
	users.splice(
		users.findIndex((e) => e.id == req.params.id),
		1,
		user
	);

	res.status(200).json({ user });
});

module.exports = router;
