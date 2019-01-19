const fs = require("fs");
let comments = require("./comments.json");
const { getArgsParsed } = require("./comments.js");
const { getFilePath } = require("./files.js");
const { sendResponse, show } = require("./utils.js");

const commentsHandler = function(req, res) {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    data = getArgsParsed(data);
    comments.unshift(data);
    comments = JSON.stringify(comments);
    fs.writeFile("./src/comments.json", comments, err => {
      show(res,fs);
    });
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
  commentsHandler(req, res);
};

module.exports = { commentsHandler, fileHandler };
