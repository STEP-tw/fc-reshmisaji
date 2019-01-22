const fs = require("fs");
const FlowerCatalog = require("./flowerCatalog.js");
const {
  commentsHandler,
  fileHandler,
  readBody,
  guestPage
} = require("./requestHandlers.js");

let app = new FlowerCatalog();
const logRequestUrl = function(req, res, next) {
  next();
};

const getComments = function(req, res, next) {
  res.write("dfgfdg ");
  res.end();
};

app.use(readBody);
app.use(logRequestUrl);
app.get("/", fileHandler);
app.post("/guestBook.html", commentsHandler);
app.get("/guestBook.html", fileHandler);
app.use(fileHandler);
app.get("/dataFiles/guestBook.html", fileHandler);
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
