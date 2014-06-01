var chai         = require('chai');
var expect       = chai.expect;
var errors       = require('../src/errors');
var utils        = require('../src/utils');

describe('Pdftk: Unit', function () {
  describe('utils', function () {
    describe('#checkCmdExists', function () {
      it('returns an error for a cmd that does not exist', function (done) {
        utils.checkCmdExists('asdfasdf', function (err, result) {
          expect(err instanceof errors.CmdDoesNotExist).to.equal(true);
          return done();
        });
      });
      it('returns an error for a failed cmd check', function (done) {
        utils.checkCmdExists('echo && alsdkjf &&', function (err, result) {
          expect(err instanceof errors.CheckCmdFailed).to.equal(true);
          done();
        });
      });
      it('returns true for a command that does exist', function (done) {
        utils.checkCmdExists('ls', function (err, result) {
          expect(result).to.equal(true);
          done();
        });
      });
    });
  });
});
