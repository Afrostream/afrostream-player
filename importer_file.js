var path = require('path');

module.exports = function (file, prev, done) {
  console.log('>>>>>>>>>>', file, prev);
  if (file === 'icons-codepoints' || file === 'icons') {
    return {
      file: path.resolve(path.join(process.cwd(), '../node_modules/videojs-font/scss/', file + (path.extname(file) ? '' : '.scss')))
    };
  }
  return {
    file: file
  };
};
