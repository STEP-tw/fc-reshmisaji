let comments = require("./comments.json");

const guestPage = `<!DOCTYPE html>
<html>
  <head>
    <title>Guest Book</title>
    <link rel="stylesheet" type="text/css" href="/css/flowers.css" />
    <script type="text/javascript" src="/js/script.js"></script>
  </head>
  <body>
    <header class="guestBook">
      <a href="/dataFiles/index.html" class="homeLink"><<</a>Guest Book
    </header>
    <main class="data_field">
      <form method="POST" action="/postComment">
      <pre>
      <h1>Leave a comment</h1>

      <label>Name :  </label><input type="text" name="name" placeholder="Enter your name here" required />

      <label>Comment : </label><textarea name="comment" id="comment" placeholder="Enter your comments" required ></textarea>

      <input  type="submit" class="submitComment"/>
    </form> </pre>
    </main>
    <hr />
    <h3> Comments <span><button onclick="refreshComments()">&#x21bb;</button></span></h3>
    <div id="comments">
    <table border="2" id="previousComments"><thead><td>DATE_TIME</td><td>NAME</td><td>COMMENTS_LIST</td></thead>`;

const guestPageBottom = `</table></div></body></html>`;

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
