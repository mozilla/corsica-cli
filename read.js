const read = require('read');

module.exports = function promiseRead (options) {
  return new Promise((resolve, reject) => {
    read(options, function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
