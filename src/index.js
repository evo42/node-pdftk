var pdftk = require('./pdftk');

var pdftkFactory = function () {
  return new pdftk();
};

pdftkFactory.pdftk = pdftk;

module.exports = pdftkFactory;
