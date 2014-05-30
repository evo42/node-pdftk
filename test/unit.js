var chai         = require('chai');
var expect       = chai.expect;
var errors       = require('../src/errors');
var utils        = require('../src/utils');

chai.use(require('chai-as-promised'));

describe('Pdftk: Unit', function () {
  describe('utils', function () {
    describe('#checkCmdExists', function () {
      it('returns rejected promise for a cmd that does not exist', function () {
        expect(utils.checkCmdExists('asdfasdf'))
          .to.be.rejectedWith(errors.CmdDoesNotExist);
      });
      it('returns fulfilled promise for a cmd that does exist', function () {
        return utils.checkCmdExists('ls')
        .then(function (response) {
          expect(response).to.equal(true);
        });
      });
      it('returns rejected promise for an unexpected result', function () {
        expect(utils.checkCmdExists('ls -l echo &&'))
          .to.be.rejectedWith(errors.CheckCmdFailed);
      });
    });
  });
});
