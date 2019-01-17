const http = require("http");
const app = require("./src/js/app.js");

const PORT = process.env.PORT || 8080;

let server = http.createServer(app);
server.listen(PORT, () => console.log("listening on ", PORT));
