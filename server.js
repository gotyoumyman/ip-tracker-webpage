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
    '  <title>BTC Gift Card</title>\n' +
    '  <style>\n' +
    '    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f8f9fa; color: #333; }\n' +
    '    .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }\n' +
    '    .btc-logo { width: 100px; height: 100px; margin-bottom: 20px; }\n' +
    '    .gift-text { font-size: 24px; color: #f7931a; margin: 20px 0; }\n' +
    '    input { width: 80%; padding: 12px; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; }\n' +
    '    button { background-color: #f7931a; color: white; padding: 12px 30px; border: none; border-radius: 5px; font-size: 18px; cursor: pointer; }\n' +
    '    button:hover { background-color: #e6800e; }\n' +
    '    .privacy { font-size: 12px; color: #666; margin-top: 40px; padding: 20px; background: #f0f0f0; border-radius: 5px; }\n' +
    '  </style>\n' +
    '</head>\n' +
    '<body>\n' +
    '  <div class="container">\n' +
    '    <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" alt="Bitcoin Logo" class="btc-logo">\n' +
    '    <h1>Welcome to Your BTC Gift!</h1>\n' +
    '    <p class="gift-text">You have 0.01 BTC waiting for you as a gift!</p>\n' +
    '    <input type="text" id="walletAddress" placeholder="Enter your BTC wallet receive address" />\n' +
    '    <br>\n' +
    '    <button onclick="receiveGift()">Receive Gift</button>\n' +
    '    <script>\n' +
    '      function receiveGift() {\n' +
    '        var address = document.getElementById("walletAddress").value;\n' +
    '        if (address) {\n' +
    '          alert("Gift sent to " + address + "! Check your wallet in a few minutes. (Demo mode)"); // Replace with real logic if needed\n' +
    '        } else {\n' +
    '          alert("Please enter your BTC wallet address.");\n' +
    '        }\n' +
    '      }\n' +
    '</html>'
  );
});

app.listen(port, '0.0.0.0', function() {
  console.log('Server running at http://localhost:' + port);
});
