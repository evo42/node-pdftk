var pdftkFactory = require('../src');
var chai         = require('chai');
var expect       = chai.expect;
var errors       = require('../src/errors');

chai.use(require('chai-as-promised'));

describe('Pdftk: Unit', function () {
  var pdftk;
  beforeEach(function () {
    pdftk = new pdftkFactory();
  });

  describe('#checkCmdExists', function () {
    it('returns rejected promise for a cmd that does not exist', function () {
      expect(pdftk.checkCmdExists('asdfasdf'))
        .to.be.rejectedWith(errors.CmdDoesNotExist);
    });
    it('returns fulfilled promise for a cmd that does exist', function () {
      return pdftk.checkCmdExists('ls')
      .then(function (response) {
        expect(response).to.equal(true);
      });
    });
    it('returns rejected promise for an unexpected result', function () {
      expect(pdftk.checkCmdExists('ls -l echo &&'))
        .to.be.rejectedWith(errors.CheckCmdFailed);
    });
  });
});
