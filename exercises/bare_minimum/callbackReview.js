/**
 * Implement these functions following the node style callback pattern.
 * There are two conditions for this pattern:
    1. The function expects a callback as the last argument
    2. The callback is invoked with (err, results)
 * Here's an example of consuming Node's built-in fs.readFile. Notice that the callback we pass into it meets the two conditions above:

  fs.readFile(__dirname + '/README.md', 'utf8', function (err, content) {
    console.log('Example from callbackReview.js')
    if (err) {
      console.log('fs.readFile failed :(\n', err)
    } else {
      console.log('fs.readFile successfully completed :)\n', content)
    }
  });

 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, 'utf8', function (err, content) {
    if (err) {
      callback(err, null);
    } else {
      let firstLine = content.split('\n')[0];
      // Note the error first pattern here
      callback(null, firstLine);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // Notice that we require the 'request' at the very beginning of this file. Request is designed to be the simplest way possible to make http calls.
  // request.get(url, callback): Defaults to method 'GET'
  request.get(url, function (err, response) {
    // This regular if-else pattern works

    // if (err) {
    //   callback(err, null);
    // } else {
    //   // To get the status code of a response, check respose.statusCode.
    //   // Here is the documentation: https://nodejs.org/api/https.html#https_https_get_options_callback
    //   callback(null, response.statusCode);
    // }

    // An alternate way to implement our error guard. Returning the callback in the if(err) part directly would terminate the code right away so that we don't need to use 'else' after that.
    if (err) {
      return callback(err, null);
    }

    callback(null, response.statusCode);
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
