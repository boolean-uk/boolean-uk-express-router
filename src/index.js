/* REQUIRE APP */
const app = require("./server.js");
const httpsServer = require("./https.js");
// const port = 3030;

httpsServer(app).listen(3030, () => {
  console.log(`HTTPS server is running`);
});

app.listen(3031, () => {
  console.log(`HTTP server is running`);
});

/* START SERVER */
// app.listen(port, () => {
// console.log(`Server is running on http://localhost:${port}/`);
// });
