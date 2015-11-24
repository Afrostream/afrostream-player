/**
 * Express configuration
 */

'use strict';

var express = require('express');

var app = express();
var env = app.get('env');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/demo');
app.use(express.static('demo'));
app.use('/dist', express.static('dist'));
app.use('/lib', express.static('lib'));
//app.use(express.static('dist'));

// Start server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});
