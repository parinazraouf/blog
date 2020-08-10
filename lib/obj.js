const castArray = require('lodash/castArray');

exports.castArrayIfNotEmpty = (input) => {
  if (input) {
    return castArray(input);
  }

  return input;
};
