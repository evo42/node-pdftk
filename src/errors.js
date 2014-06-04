//var createError = require('create-error');

function CmdFailedError (message) {
  this.name = 'Command Failed Error';
  this.message = message;
}
CmdFailedError.prototype = Object.create(Error.prototype);
CmdFailedError.prototype.constructor = CmdFailedError;

module.exports = {
  CmdFailedError: CmdFailedError
};
