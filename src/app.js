const fs = require("fs");
const FlowerCatalog = require("./flowerCatalog.js");
const { commentsHandler, fileHandler } = require("./requestHandlers.js");

let app = new FlowerCatalog();
const logRequestUrl = function(req, res, next) {
  next();
};

app.use(logRequestUrl);
app.get("/", fileHandler);
app.post("/guestBook.html", commentsHandler);
app.get("/dataFiles/guestBook.html", fileHandler);
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
