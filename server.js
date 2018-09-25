var express = require('express');
var currency = require('./modules/currency');
var bodyParser = require('body-parser');
var path = require('path');
const { body, validationResult } = require('express-validator/check');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');

app.post('/validate', [
  body('email', 'Email template').isEmail()
],
 (req, res) => {
  console.info('Email = ' + req.body.email);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.render("created.ejs", { email: req.body.email });
    // res.sendFile(path.join(__dirname+'/public/created.html'));
  } else {
    return res.status(422).json({ errors: errors.array() });
  }
});

app.get('/hello', function (req, res) {
  res.send('US -> UAH ' + currency.usToUah(50));
});

app.get('/params', function (req, res) {
  var id = req.query.id;
  res.set('Content-Type', 'text/plain');
  res.send('Request param = ' + id);
});

app.post('/create', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send('POST response\n');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
  console.log('Node env = ' + app.get('env'));
  // use export NODE_ENV=production before npm start to override this behaviour
});