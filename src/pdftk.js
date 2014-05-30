var Promise     = require('bluebird');
var errors      = require('./errors');
var pexec       = Promise.promisify(require('child_process').exec);

/*
 * Constructor
 * @author - Peter Nagel
 * @date - 5/29/2014
*/
var Pdftk = function () {
  return this.checkCmdExists('pdftk').done();
};

/*
 * Check if the supplied command exists in the $PATH
 * @author - Peter Nagel
 * @date - 5/29/2014
 * @param {string} - cmd to check for existence
*/
Pdftk.prototype.checkCmdExists = function(cmd) {
  var checkCmd = 'type -P ' + cmd + ' &>/dev/null && echo 1 || echo 0';
  return pexec(checkCmd)
    .then(function (stdout, stderr) {
      if (stdout && stdout[0].substring(0,1) === '1') {
        return true;
      } else if (stdout && stdout[0].substring(0,1) === '0') {
        throw new errors.CmdDoesNotExist();
      } else {
        throw new errors.CheckCmdFailed();
      }
    });
};

module.exports = Pdftk;
