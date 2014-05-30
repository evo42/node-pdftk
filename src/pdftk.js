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

module.exports = Pdftk;
