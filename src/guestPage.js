let comments = require("../public/dataFiles/comments.json");

const showPage = function(comments) {
  return guestPage + comments + guestPageBottom;
};

const prepareComments = function(comments) {
  let tbody = "<tbody>";
  comments = comments.slice(0, -1);
  comments = JSON.parse(`[${comments}]`);
  let guestComments = comments.map(comment => {
    return `<tr><td>${comment.dateTime}</td><td>${comment.name}</td><td>${
      comment.comment
    }</td></tr>`;
  });
  return tbody + guestComments.join("") + "</tbody>";
};

const show = function(res) {
  comments = prepareComments(comments);
  res.write(showPage(comments));
  res.end();
};

const sendResponse = function(res, statusCode, data) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

const guestPageHandler = function(res) {
  let commentList = prepareComments(comments);
  let guestPageHtml = showPage(commentList);
  res.write(guestPageHtml);
  res.end();
};

module.exports = { sendResponse, show, guestPageHandler };
