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
  parsedObject.dateTime = new Date();
  let json = JSON.stringify(parsedObject);
  return json;
};

module.exports = { getArgsParsed };
