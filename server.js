const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

app.use(function(req, res, next) {
  var forwarded = req.headers['x-forwarded-for'];
  var ip = forwarded ? forwarded.split(',')[0].trim() : (req.ip || req.connection.remoteAddress);
  var timestamp = new Date().toLocaleString();
  var log = 'IP: ' + ip + ', Timestamp: ' + timestamp + ', URL: ' + req.url + '\n';
  fs.appendFile('access.log', log, function(err) {
    if (err) console.error('Error writing to log:', err);
  });
  console.log('Request from IP: ' + ip + ' at ' + timestamp);
  next();
});

app.get('/', function(req, res) {
  res.send(
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '  <title>Secure Webpage</title>\n' +
    '</head>\n' +
    '<body style="font-family: Arial; text-align: center; padding: 50px; background-color: #f4f4f4;">\n' +
    '  <h1>Welcome to the Secure Webpage</h1>\n' +
    '  <p>This page is monitored for security purposes.</p>\n' +
    '  <div style="background-color: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">\n' +
    '    <h2>Privacy Notice</h2>\n' +
    '    <p>We collect your IP address and visit timestamp for security monitoring to protect our website. This data is stored securely and not shared with third parties. For more details, contact our support team.</p>\n' +
    '  </div>\n' +
    '</body>\n' +
    '</html>'
  );
});

app.listen(port, '0.0.0.0', function() {
  console.log('Server running at http://localhost:' + port);
});
