const got = require('got');

module.exports = exports = async (method, url, body, options = {}) => {
  const defaultOptions = {
    json: true,
    timeout: 6000,
    ...options,
    method,
    body
  };

  return got(url, defaultOptions);
};

exports.HTTPError = got.HTTPError;
exports.RequestError = got.RequestError;
exports.TimeoutError = got.TimeoutError;
