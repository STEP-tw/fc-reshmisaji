const hide = function() {
  document.getElementById("flowers").style.visibility = "hidden";
  setTimeout(function() {
    document.getElementById("flowers").style.visibility = "visible";
  }, 1000);
};

const refreshComments = function() {
  fetch("/dataFiles/guestBook.html")
    .then(res => {
      return res.text();
    })
    .then(comments => {
      let commentsDiv = document.getElementById("userComments");
      commentsDiv.innerHTML = document.getElementById("userComments").innerHTML;
    });
};

window.onload = () => (document.getElementById("flowers").onclick = hide);
