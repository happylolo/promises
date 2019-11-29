/**
 * Create the promise returning `Async` suffixed versions of the functions below.
 * Promisify them if you can, otherwise roll your own promise returning function.
 * To read more about promisifying existing functions, refer to the bluebird official documentation here: http://bluebirdjs.com/docs/api/promisification.html
 */

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

// Promisify existing node style callback pattern:
var getGitHubProfileAsync = Promise.promisify(getGitHubProfile);

// // Or write our own promise returning function without promisifying the getGitHubProfile function:
// var getGitHubProfileAsync = function (user) {
//   return new Promise(function (resolve, reject) {
//     var options = {
//       url: 'https://api.github.com/users/' + user,
//       headers: { 'User-Agent': 'request' },
//       json: true // will JSON.parse(body) for us
//     };

//     request.get(options, function (err, res, body) {
//       if (err) {
//         reject(err);
//       } else if (body.message) {
//         reject(new Error('Failed to get GitHub profile: ' + body.message));
//       } else {
//         resolve(body);
//       }
//     });
//   });
// };

// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

// Promisify existing node style callback pattern:
var generateRandomTokenAsync = Promise.promisify(generateRandomToken);

// // Or write our own promise returning function without promisifying the generateRandomToken function:
// var generateRandomTokenAsync = function () {
//   return new Promise(function (resolve, reject) {
//     crypto.randomBytes(20, function (err, buffer) {
//       if (err) {
//         return reject(err);
//       }

//       resolve(buffer.toString('hex'));
//     });
//   });
// };


/** Asynchronous functions in JavaScript should follow the node style callback pattern. There are two conditions for this pattern:
  1. The function expects a callback as the last argument
  2. The callback is invoked with (err, results)
*/

// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function (err, file) {
    // This function violates rule (2) of the node style callback pattern. The callback is not invoked with (err, results). Therefore, we should not use Promise.promisify and have to reimplement it using the `new Promise` constructor.
    if (err) { return callback(err); }

    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

// Reimplement readFileAndMakeItFunny using the `new Promise` constructor:
var readFileAndMakeItFunnyAsync = function (filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, file) {
      if (err) {
        return reject(err);
      }

      var funnyFile = file.split('\n')
        .map(function(line) {
          return line + ' lol';
        })
        .join('\n');

      resolve(funnyFile);
    });
  });
};

// // Alternatively, we could use our previously written function and do some error checking on the only argument passed to the callback:
// readFileAndMakeItFunnyAsync = function(filePath) {
//   return new Promise(function(resolve, reject) {
//     readFileAndMakeItFunny(filePath, function(errorOrFile) {
//       if (errorOrFile instanceof Error) {
//         reject(errorOrFile);
//       } else {
//         resolve(errorOrFile);
//       }
//     });
//   });
// };

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync,
};
