var errors      = require('./errors');
var exec        = require('child_process').exec;

/*
 * Check if the supplied command exists in the $PATH
 * @author - Peter Nagel
 * @date - 5/29/2014
 * @param {string} - cmd to check for existence
*/
module.exports.checkCmdExists = function(cmd, next) {
  var checkCmd = 'type -P ' + cmd + ' &>/dev/null && echo 1 || echo 0';
  exec(checkCmd, function (err, stdout, stderr) {
    console.log(cmd, err, stdout, stderr);
    if(stdout && stdout[0].substring(0,1) === '1') {
      next(null, true);
    } else if(stdout && stdout[0].substring(0,1) === '0') {
      next(new errors.CmdDoesNotExist(), null);
    } else {
      next(new errors.CheckCmdFailed(), null);
    }
  });
};
