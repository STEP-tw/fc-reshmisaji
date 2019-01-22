const prepareComments = function(comments) {
  let guestComments = comments.map(comment => {
    return `<tr>
    <td>${comment.dateTime}</td>
    <td>${comment.name}</td>
    <td>${comment.comment}</td>
    </tr>`;
  });

  return "<table><tbody>" + guestComments.join("") + "</tbody></table>";
};

const fetchComments = function() {
  fetch("/dataFiles/comments.json")
    .then(res => res.json())
    .then(response => {
      let tableContents = prepareComments(response);
      document.getElementById("comments").innerHTML = tableContents;
    });
};
window.onload = fetchComments;
