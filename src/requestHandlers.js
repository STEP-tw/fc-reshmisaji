const fs = require("fs");
let comments = require("./comments.json");
const { getArgsParsed } = require("./comments.js");
const { getFilePath } = require("./files.js");
const { sendResponse, show, guestPageHandler } = require("./guestPage.js");

const readBody = (req, res, next) => {
  let content = "";
  req.on("data", chunk => (content += chunk));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const commentsHandler = function(req, res, comments) {
  let data = req.body;
  data = getArgsParsed(data);
  comments.unshift(data);
  comments = JSON.stringify(comments);
  fs.writeFile("./src/comments.json", comments, err => {
    show(res);
  });
};

const fileHandler = (req, res) => {
  if (req.method == "GET") {
    let filePath = getFilePath(req.url);
    fs.readFile(filePath, (err, data) => {
      try {
        sendResponse(res, 200, data);
      } catch (err) {
        sendResponse(
          res,
          404,
          "The server has not found anything matching the Request-URL."
        );
      }
    });
    return;
  }
  commentsHandler(req, res, comments);
};
const guestPage = function(req, res) {
  guestPageHandler(res);
};

module.exports = { commentsHandler, fileHandler, readBody, guestPage };
