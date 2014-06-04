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
      var res = stdout[0].match(/pdftk\s([0-9a-z\.]*)\s/);
      return res[res.index];
    });
};

module.exports = Pdftk;
