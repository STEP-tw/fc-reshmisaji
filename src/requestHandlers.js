const fs = require("fs");
let comments = require("../public/dataFiles/comments.json");
const { getArgsParsed, getFilePath } = require("./dataHandler.js");
const { sendResponse } = require("./responseHandler.js");

const readBody = (req, res, next) => {
  let content = "";
  req.on("data", chunk => (content += chunk));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const addComments = function(comments, data) {
  comments.unshift(data);
  comments = JSON.stringify(comments);
  fs.writeFile("./public/dataFiles/comments.json", comments, err => {});
  return;
};

const commentsHandler = function(req, res, comments) {
  let data = req.body;
  data = getArgsParsed(data);
  addComments(comments, data);
  let filePath = getFilePath(req.url);
  appendComments(res, filePath);
};

const appendComments = function(res, path) {
  fs.readFile(path, (err, data) => {
    if (err) {
      sendResponse(
        res,
        404,
        "The server has not found anything matching the Request-URL."
      );
      return;
    }
    sendResponse(res, 200, data);
  });
};

const getContents = function(req, res) {
  let filePath = getFilePath(req.url);
  appendComments(res, filePath);
};

const fileHandler = (req, res) => {
  if (req.method == "GET") {
    getContents(req, res);
    return;
  }
  commentsHandler(req, res, comments);
};

module.exports = { commentsHandler, fileHandler, readBody };
