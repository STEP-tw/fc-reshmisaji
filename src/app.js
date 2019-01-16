const fs = require("fs");


const app = (req, res) => {
  let fileName = "." + req.url;

  res.statusCode = 200;
  if (req.url == "/") {
    fileName = "./dataFiles/index.html";
  }

  fs.readFile(fileName, (err, data) => {
    try {
      res.write(data);
      res.end();
    } catch (err) {
      res.end();
    }
  });
};

module.exports = app;
