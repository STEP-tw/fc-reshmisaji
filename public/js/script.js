const hide = function() {
  document.getElementById("flowers").style.visibility = "hidden";
  setTimeout(function() {
    document.getElementById("flowers").style.visibility = "visible";
  }, 1000);
};

window.onload = () => (document.getElementById("flowers").onclick = hide);