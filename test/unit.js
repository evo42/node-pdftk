var chai         = require('chai');
var expect       = chai.expect;
var PdftkFactory = require('../src');

describe('Pdftk: Unit', function () {
  var pdftk;
  beforeEach(function () {
    pdftk = new PdftkFactory();
  });

  describe('getVersion', function () {
    it('should return a string with the version of pdftk', function (done) {
      pdftk.getVersion()
        .then(function (version) {
          expect(version).to.match(/[0-9]\.[0-9][0-9]/);
          done();
        });
    });
  });
});
