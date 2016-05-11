var path = require('path');

module.exports = function (file) {
  console.log('>>>>>>>>>>');
  console.log(path.resolve(path.join(process.cwd(), 'node_modules/', file + (path.extname(file) ? '' : '.scss'))));
  return {
    file: path.resolve(path.join(process.cwd(), 'node_modules/', file + (path.extname(file) ? '' : '.scss')))
  };
};
