const sendResponse = function(res, statusCode, data) {
  res.statusCode = statusCode;
  res.write(data);
  res.end();
};

module.exports = { sendResponse };
