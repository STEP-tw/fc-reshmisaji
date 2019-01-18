const fs = require("fs");
const comments = require("./comments.json");

let routes = {
  url: "/",
  method: "GET",
  action: "./public/dataFiles/index.html"
};

const parsedObject = function(arguments) {
  let data = {};
  arguments.forEach(argument => {
    let [key, value] = argument.split("=");
    data[key] = value;
  });
  return data;
};

const parser = function(argument) {
  argument = argument.split("&");
  return parsedObject(argument);
};

const getArgsParsed = function(argument) {
  let parsedObject = parser(argument);
  parsedObject.dataTime = new Date().toDateString();
  let json = JSON.stringify(parsedObject);

  return json;
};

const getFilePath = function(url) {
  if (url == routes.url) {
    return "./public/dataFiles/index.html";
  }
  return "./public" + url;
};

const sendResponse = function(res, statusCode, data) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

const commentsHandler = function(req, res) {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    data = getArgsParsed(data);
    comments.push(data);
    fs.writeFile("./src/comments.json", JSON.stringify(comments), err =>
      sendResponse(res, 200, data)
    );
  });
};

const app = (req, res) => {
  console.log(req.url);

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
  let data = commentsHandler(req, res);
};

module.exports = app;
