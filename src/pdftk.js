var Promise     = require('bluebird');
var errors      = require('./errors');
var pexec        = Promise.promisify(require('child_process').exec);

var internals = {};

/*
 * Constructor
 * @author - Peter Nagel
 * @date - 5/29/2014
*/
var Pdftk = function () {
};

/*
 * Run a command through exec and return promise
 * @author - Peter Nagel
 * @date - 6/3/2014
 */
internals.runCmd = function (cmd) {
  return pexec(cmd)
    .then(function (stdout, stderr) {
      if (stderr) {
        throw new errors.CmdFailedError(stderr);
      } else {
        return stdout;
      }
    }).catch(function (err) {
      throw new errors.CmdFailedError(err.message);
    });
};

/*
 * Get the version of Pdftk running on the server
 * @author - Peter Nagel
 * @date - 6/3/2014
 */
Pdftk.prototype.getVersion = function () {
  return internals.runCmd('pdftk --version')
    .then(function (stdout) {
      var res = stdout[0].match(/pdftk\s([0-9.]*)\s/);
      return res[res.index];
    });
};

/*
 * Take an arbitrary integer and construct a file
 * handler in the form of ABC
 * @author - Peter Nagel
 * @date - 6/3/2014
 * @param {number} - integer to convert
 */
internals.getHandle = function (index) {
  var handle = '';
  var numChars = (index % 26 === 0) ? index / 26 : Math.floor(index / 26) + 1;
  for (var i = 0; i < numChars; i = i + 1) {
    if (index <= 26) {
      handle = handle + String.fromCharCode(96 + index).toUpperCase();
    } else {
      handle = handle + String.fromCharCode(96 + (i + 1)).toUpperCase();
    }
  }
  return handle;
};

/*
 * Convert an array of filenames in to a string of
 * handles for pdftk to work with.
 * @author - Peter Nagel
 * @date - 6/3/2014
 */
Pdftk.prototype.filesToHandles = function (files) {
  var handles = '';
  var i = 1;
  files.forEach(function (file) {
    internals.getHandle(i);
    handles = handles +
      internals.getHandle(i) +
      '=' + file + ' ';
    i = i + 1;
  });

  return handles;
};

module.exports = Pdftk;
