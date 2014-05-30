var createError = require('create-error');

module.exports = {
  CheckCmdFailed: createError('CheckCmdFailed', {
    message: 'Check for command failed unexpectedly'
  }),
  CmdDoesNotExist: createError('CmdDoesNotExist', {
    message: 'Supplied command does not exist on $PATH'
  })
};
