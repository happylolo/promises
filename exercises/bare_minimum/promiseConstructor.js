/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function (filePath) {
  // Create a new promise. The passed in function will receive functions 'resolve' and 'reject' as its arguments which can be called to seal the fate of the created promise.
  // Reference: http://bluebirdjs.com/docs/api/new-promise.html
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, content) {
      if (err) {
        reject(err);
      } else {
        let firstLine = content.split('\n')[0];
        resolve(firstLine);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise(function (resolve, reject) {
    request.get(url, function (err, response) {
      // This regular if-else pattern works

      // if (err) {
      //   reject(err);
      // } else {
      //   resolve(response.statusCode);
      // }

      // An alternate way to implement our error guard
      if (err) {
        return reject(err);
      }

      resolve(response.statusCode);
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
