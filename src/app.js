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
app.use(readBody);
app.use(logRequestUrl);
app.get("/", fileHandler);
app.post("/guestBook.html", commentsHandler);
app.get("/dataFiles/guestBook.html", guestPage);
app.get("/displayComments", guestPage);
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
