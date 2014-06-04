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
  describe('filesToHandles', function () {
    it('should split a small array', function (done) {
      var files = ['file1.pdf', 'file2.pdf', 'file3.pdf'];
      var handles = pdftk.filesToHandles(files);
      expect(handles.split(' ').length).to.equal(3);
      expect(handles.split(' ')[2]).to.equal('C=file3.pdf');
      done();
    });
    it('should split an array longer than 26', function (done) {
      var files = [];
      for (var i = 1; i <= 750; i = i + 1) {
        files.push('file' + i + '.pdf');
      }
      var handles = pdftk.filesToHandles(files);
      expect(handles.split(' ').length).to.equal(750);
      expect(handles.split(' ')[29]).to.equal('AD=file30.pdf');
      expect(handles.split(' ')[59]).to.equal('BH=file60.pdf');
      expect(handles.split(' ')[702]).to.equal('AAA=file703.pdf');
      expect(handles.split(' ')[749]).to.equal('ABV=file750.pdf');
      done();
    });
  });
});
