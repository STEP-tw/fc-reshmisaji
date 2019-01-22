const fs = require("fs");
let comments = require("../public/dataFiles/comments.json");
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
  console.log(comments);

  comments = JSON.stringify(comments);
  console.log(comments);

  fs.writeFile("./public/dataFiles/comments.json", comments, err => {});
  res.write(comments);
  res.end();
};

const getContents = function(req, res) {
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
};

const fileHandler = (req, res) => {
  if (req.method == "GET") {
    getContents(req, res);
    return;
  }
  commentsHandler(req, res, comments);
};

const guestPage = function(req, res) {
  guestPageHandler(res);
};

module.exports = { commentsHandler, fileHandler, readBody, guestPage };
