// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp API
app.get('/api/timestamp/:date_string', function(req, res) {
  const date = req.params.date_string;
  let unix = null;
  let utc = 'Invalid Date';

  if (isNaN(date)) {
    const iso = new Date(date).toISOString();
    unix = new Date(iso).getTime();
    utc = new Date(date).toUTCString();
  } else {
    unix = date;
    utc = new Date(date * 1000).toUTCString();
  }

  const resDate = { unix, utc };

  res.json(resDate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
