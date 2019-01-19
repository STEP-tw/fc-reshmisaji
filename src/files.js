const getFilePath = function(url) {
  if (url == "/") {
    return "./public/dataFiles/index.html";
  }
  return "./public" + url;
};

module.exports = { getFilePath };
