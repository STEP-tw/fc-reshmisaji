const fs = require("fs");

const putComment = function() {
  let comments = fs.readFileSync("/dataFiles/comments.json", "utf8");
  comments = comments.slice(0, -1);
  console.log(comments);

  let commentsObj = JSON.parse([comments]);
  return `${commentsObj}`;
};

const addComment = function(res, args) {
  let json = getArgsParsed(args);
  fs.addFile("/dataFiles/comments.json", json + ",", function(err, data) {
    res.write(putComment());
    send(res, 200, "");
  });
};

const postHandler = function(req, res) {
  let args = "";
  req.on("data", chunk => (args = args + chunk));
  req.on("end", function() {
    addComment(res, args);
  });
};

module.exports = { postHandler };
