/* REQUIRE APP */
const app = require("./server.js");
const port = 3031;

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
