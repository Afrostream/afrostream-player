/**
 * Express configuration
 */

'use strict';

var express = require('express');

var app = express();
var env = app.get('env');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static('demo'));
app.use(express.static('dist'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Start server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express server listening on %d, in %s mode', port, app.get('env'));
});
