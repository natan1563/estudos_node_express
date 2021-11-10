"use strict";

var express = require('express');

var exphbs = require('express-handlebars');

var conn = require('./db/conn');

var User = require('./moduls/User');

var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express["static"]('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.get('/', function (req, res) {
  res.render('home');
});
app.listen(3000);