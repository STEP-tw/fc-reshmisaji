const fs = require("fs");

let routes = { url: "/", method: "GET", action: "./dataFiles/index.html" };

const getFilePath = function(url) {
  if (url == routes.url) {
    return "./dataFiles/index.html";
  }
  return "." + url;
};

const sendResponse = function(res, statusCode, data) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

const app = (req, res) => {
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
};

module.exports = app;
